class BoardPage{
    get completeSection() {return cy.get('[data-test="board-header__list-item__complete"]')}
    get inProgressSection() {return cy.get('[data-test="board-header__list-item__in progress"]')}
    get toDoSection() {return cy.get('[data-test="board-header__list-item__to do"]')}
    get toDoGroupOptionsButton() {return cy.get('[class="toggle cu-dropdown cu-dropdown__toggle ng-star-inserted"]').first()}
    get inProgressGroupOptionsButton() {return cy.get('[class="toggle cu-dropdown cu-dropdown__toggle ng-star-inserted"]').eq(1)}
    get completeGroupOptionsButton() {return cy.get('[class="toggle cu-dropdown cu-dropdown__toggle ng-star-inserted"]').last()}
    get archiveAllInThissGroupButton() {return cy.get('[data-test="dropdown-list-item__Archive all in this group"]')}
    get archiveConfirmationButton() {return cy.get('[data-test="confirmation-modal__confirm-button"]')}
}

export default new BoardPage();