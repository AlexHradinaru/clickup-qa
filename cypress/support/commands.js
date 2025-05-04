import loginPage from "../page_objects/login.page";

Cypress.on('window:before:load', (win) => {
  Object.defineProperty(win.navigator, 'webdriver', {
    get: () => false,
  });
  delete win.Cypress;
});

// TODO: Integrate and test clickWhileVisible with the rest of the codebase.
// This command is not yet used or finalized.
// en example of use for the 'login' command:
// cy.clickWhileVisible('button:contains("Log In")');
// cy.url().should('contain',teamId)
Cypress.Commands.add('clickWhileVisible', (selector, maxAttempts = 50, delay = 3000) => {
  let attempts = 0;

  function clickIfVisible() {
    cy.get('body').then(($body) => {
      if ($body.find(selector).length && attempts < maxAttempts) {
        cy.get(selector).should('be.visible').click({ force: true });
        attempts++;
        cy.wait(delay).then(clickIfVisible);
      }
    });
  }

  clickIfVisible();
});

Cypress.Commands.add('login', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');
  const teamId = Cypress.env('teamId');
  cy.visit('/', {
    headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    }
  });
  loginPage.emailInput.type(email);
  loginPage.passwordInput.type(password);
  loginPage.loginButton.click();

  cy.clickWhileVisible('button:contains("Log In")');
  cy.url().should('contain',teamId)
});

Cypress.Commands.add("apiCreateSpace", (spaceName = "Test Space #12234", listName = "Test List #5678") => {
  const apiToken = Cypress.env('API');
  const teamId = Cypress.env('teamId');

  return cy.request({
    method: "POST",
    url: `https://api.clickup.com/api/v2/team/${teamId}/space`,
    headers: {
      Authorization: apiToken
    },
    body: {
      name: spaceName,
      multiple_assignees: true,
      features: {
        due_dates: { enabled: true, start_date: true, remap_due_dates: false, remap_closed_due_date: false },
        time_tracking: { enabled: true },
        tags: { enabled: true },
        time_estimates: { enabled: true },
        checklists: { enabled: true },
        custom_fields: { enabled: true },
        remap_dependencies: { enabled: false },
        dependency_warning: { enabled: false },
        portfolios: { enabled: false }
      }
    }
  }).then((spaceRes) => {
    const spaceId = spaceRes.body.id;
    return cy.request({
      method: "POST",
      url: `https://api.clickup.com/api/v2/space/${spaceId}/list`,
      headers: { Authorization: apiToken },
      body: { name: listName }
    }).then((listRes) => {
      return { spaceId, listId: listRes.body.id };
    });
  });
});

Cypress.Commands.add("apiDeleteSpace", (spaceId) => {
  const apiToken = Cypress.env('API');
  return cy.request({
    method: "DELETE",
    url: `https://api.clickup.com/api/v2/space/${spaceId}`,
    headers: {
      Authorization: apiToken,
      Accept: "application/json"
    },
    withCredentials: false
  }).then((response) => {
    cy.log(JSON.stringify(response.body));
    console.log(response.body);
    return cy.wrap(response.body);
  });
});
