class PostPage{
    get selectChannelButton() {return cy.get('[data-test="use-chat-rooms-selector"]')}
    get selectWorkSpaceArea() {return cy.get('[data-test="use-chat-rooms-selector__item"]')}
    get postTitleField() {return cy.get('[data-test="editable__input"]')}
    get postContentField() {return cy.get('[data-test="comment-bar__editor"]')}
    get postButton() {return cy.get('[data-test="comment-bar__send-btn"]')}
    get postArea() {return cy.get('[data-test="chat-post__wrapper"]')}
    get postSettingButton() {return cy.get('[class="_postToolbarWrapper_dxyej_27"] [class*="_image_u9do9_1 _cuIcon_u9do9_64 _small_u9do9_9 _leadingIcon"]')}
    get postDeleteButton() {return cy.get('[class*="_label_ntnjd_32 _menuItemLabel"]').last()}
    get postConfirmDeleteButton() {return cy.contains('[cu3-type="primary"]', 'Delete')}

    selectWorkSpace(index){
        return cy.get('[data-test="use-chat-rooms-selector__item"]').eq(index)
    }
}

export default new PostPage();