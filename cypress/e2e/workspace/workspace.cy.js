import spacesPage from "../../page_objects/spaces.page";
import listPage from "../../page_objects/list.page";
import boardPage from "../../page_objects/board.page";
import postPage from "../../page_objects/post.page";

describe("ClickUp Spaces and Tasks E2E", () => {
  beforeEach(() => {
    cy.login();
  });

  it("creates a new space via UI and deletes it via API", () => {
    const newSpaceTitle = "New Workspace for project #777";
    const newSpaceDescription = "New description for project #777";

    cy.contains("Create new Space", { timeout: 15000 }).should("be.visible");

    spacesPage.createNewSpaceButton.click();
    spacesPage.newSpaceNameInput.type(newSpaceTitle);
    spacesPage.newSpaceDescriptionInput.type(newSpaceDescription);
    spacesPage.continueButton.click();

    spacesPage.createSpaceButton.should("be.visible").click();

    spacesPage.spaceNameSideBarButton.click();

    spacesPage.spaceNameSideBarButton
      .should("be.visible")
      .contains(newSpaceTitle);
    cy.contains("button", "Add Bookmark").should("be.visible");

    cy.url()
      .then((url) => {
        const match = url.match(/\/(\d+)(?:\/)?$/);
        if (match) {
          const listId = match[1];
          return cy.apiDeleteSpace(listId);
        } else {
          return cy.log("No space ID found in URL");
        }
      })
      .then(() => {
        spacesPage.spaceNameSideBarButton
          .should("be.visible", { timeout: 7000 })
          .contains("Everything");
      });
  });

  it("creates a space via API, manages tasks, and deletes the space via API", () => {
    const firstTask = "this is my first task";
    const secondTask = "this is my second task";
    const thirdTask = "this is my third task";

    cy.apiCreateSpace().then(({ spaceId }) => {
      listPage.newTaskInput.type(firstTask + "{enter}", { timeout: 15000 });
      listPage.newTaskInput.type(secondTask + "{enter}");
      listPage.newTaskInput.type(thirdTask + "{enter}");

      listPage.listOfTasks.should("have.length", 3);
      listPage.listOfTasks.first().should("contain", firstTask);
      listPage.listOfTasks.last().should("contain", thirdTask);

      listPage.getTaskSettingsButton(0).click();
      listPage.deleteTaskButton.click();

      listPage.listOfTasks.should("have.length", 2);

      listPage.markTaskAsComplete(0);
      listPage.boardButton.click();

      boardPage.completeSection.should("contain", "1");
      boardPage.toDoSection.should("contain", "1");

      boardPage.toDoGroupOptionsButton.click();
      boardPage.archiveAllInThissGroupButton.click();
      boardPage.archiveConfirmationButton.click();
      boardPage.completeGroupOptionsButton.click();
      boardPage.archiveAllInThissGroupButton.click();
      boardPage.archiveConfirmationButton.click();

      boardPage.completeSection.should("contain", "0");
      boardPage.toDoSection.should("contain", "0");

      cy.apiDeleteSpace(spaceId);
    });
  });

  it("creates a space via API and deletes it via UI", () => {
    cy.apiCreateSpace().then(() => {
      cy.contains(`Don't show me this again`).click()
      spacesPage.listHeaderArea.should("be.visible", { timeout: 10000 });

      spacesPage.spaceNameSideBarButton
        .should("be.visible", { timeout: 10000 })
        .click();
      spacesPage.overviewRecentArea.should("be.visible", { timeout: 10000 });

      spacesPage.spaceNameSettingsButton
        .should("be.visible", { timeout: 10000 })
        .click();
      spacesPage.spaceNameSettongsDeleteButton
        .should("be.visible", { timeout: 10000 })
        .click();
      spacesPage.spaceNameDeleteConfirmationButton
        .should("be.visible", { timeout: 10000 })
        .click();

      spacesPage.spaceMyWorkCardArea
        .should("be.visible")
        .contains("Tasks and Reminders assigned to you will show here. ");
    });
  });
});

// =======================
// TODO / BLOCKED TESTS
// =======================

/**
 * Test: creates and deletes a post in chat
 * Status: BLOCKED
 * Reason: Blocked by ClickUp plan limits — "You've reached the limit for Chat Posts on your current plan".
 * Needed: Upgrade ClickUp plan, use a test workspace with higher limits, or request a sandbox environment from ClickUp support.
 * Note: This test is commented out to avoid unnecessary failures until the limit is lifted.
 */
// it('creates and deletes a post in chat', () => {
//   cy.visit('90131211023/chat/r/posts')
//   postPage.selectChannelButton.should('be.visible', {timeout: 15000 }).click()
//   postPage.selectWorkSpace(0).click()
//   postPage.postTitleField.type('Post title')
//   postPage.postContentField.type('Post content')
//   postPage.postButton.click()
//   postPage.postArea.contains('Post title')
//   postPage.postArea.first().trigger('mouseover');
//   postPage.postSettingButton.click()
//   postPage.postDeleteButton.click()
//   postPage.postConfirmDeleteButton.click();
// });
