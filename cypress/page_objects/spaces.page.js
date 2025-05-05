class SpacesPage{
    get createNewSpaceButton() {return cy.get('[class="cu-table-placeholder__create-space"]')}
    get newSpaceNameInput() {return cy.get('[data-test="create-space-details__input"]').first()}
    get newSpaceDescriptionInput() {return cy.get('[data-test="create-space-details__input"]').last()}
    get continueButton() {return cy.get('[data-test="create-space-details__continue-button"]')}
    get createSpaceButton() {return cy.get('[data-test="create-test-workflow__create-space-button"]')}
    get spaceNameSettingsButton() {return cy.get('cu-ellipsis-button > .button')}
    get spaceNameSettongsDeleteButton() {return cy.get('[data-test="nav-menu-item__name"]', {timeout: 10000})}
    get spaceNameDeleteConfirmationButton() {return cy.get('[data-test="confirmation-modal__confirm-button"]', {timeout: 10000})}
    get spaceNameSideBarButton() {return cy.get('[data-test*="breadcrumb-item__name"]').first()}
    get spaceMyWorkCardArea() {return cy.get('[data-test="legacy-my-work__card"]')}
    get listHeaderArea() {return cy.get('[data-test="dashboard-table__body-public"]')}
    get overviewRecentArea() {return cy.get('[data-test="grid-layout-item-breadcrumbs__Recent"]')}
}

export default new SpacesPage();