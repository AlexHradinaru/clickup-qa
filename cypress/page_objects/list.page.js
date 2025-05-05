class ListPage{
    get newTaskInput() {return cy.get('[data-test="task-row-new__input"]', { timeout: 10000 })}
    get listOfTasks() {return cy.get('[data-test="task-list__task-row"]')}
    get taskSettingsButton() {return cy.get('[data-test="task-row-menu__ellipsis-v3-button"]')}
    get deleteTaskButton() {return cy.get('[data-test="quick-actions-menu__delete-task"]')}
    get taskStatusButton() {return cy.get('[data-test="task-row-status__limited-edit-status"]')}
    get completeStatusButton() {return cy.get('[data-test="status-list__complete"]')}
    get boardButton() {return cy.get('[data-test="data-view-item__Board"]').first()}

    getTaskSettingsButton(index){
        return cy.get('[data-test="task-row-menu__ellipsis-v3-button"]').eq(index)
    }

    markTaskAsComplete(index){
        this.taskStatusButton.eq(index).click()
    }
}

export default new ListPage();