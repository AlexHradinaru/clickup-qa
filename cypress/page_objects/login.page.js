class LoginPage{
    get emailInput() {return cy.get('[id="login-email-input"]')}
    get passwordInput() {return cy.get('[id="login-password-input"]')}
    get loginButton() {return cy.get('[data-test="login-submit"]')}
}

export default new LoginPage();