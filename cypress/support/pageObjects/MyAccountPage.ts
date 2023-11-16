export class MyAccountPage {

    private readonly getElementsMyAccountPage = {
        title: () => cy.get('main h2'),
        image: () => cy.get('main svg path'),
        firstNameField : () => cy.get('#user-settings-firstName-input'),
        firstNameErrorMsg : () => cy.get('#user-settings-firstName-input-helper-text'),
        lastNameField : () => cy.get('#user-settings-lastName-input'),
        lastNameErrorMsg : () => cy.get('#user-settings-lastName-input-helper-text'),
        emailField : () => cy.get('#user-settings-email-input'),
        emailErrorMsg : () => cy.get('#user-settings-email-input-helper-text'),
        phoneNumberField : () => cy.get('#user-settings-phoneNumber-input'),
        phoneNumberErrorMsg : () => cy.get('#user-settings-phoneNumber-input-helper-text'),
        saveButton: () => cy.get('[data-test="user-settings-submit"]')
    }

    getTitle(){
        return this.getElementsMyAccountPage.title();
    }

    getImage(){
        return this.getElementsMyAccountPage.image();
    }

    getFirstNameField(){
        return this.getElementsMyAccountPage.firstNameField();
    }

    getFirstNameErrorMsg(){
        return this.getElementsMyAccountPage.firstNameErrorMsg();
    }

    getLastNameField(){
        return this.getElementsMyAccountPage.lastNameField();
    }

    getLastNameErrorMsg(){
        return this.getElementsMyAccountPage.lastNameErrorMsg();
    }

    getEmailField(){
        return this.getElementsMyAccountPage.emailField();
    }

    getEmailErrorMsg(){
        return this.getElementsMyAccountPage.emailErrorMsg();
    }

    getPhoneNumberField(){
        return this.getElementsMyAccountPage.phoneNumberField();
    }

    getPhoneNumberErrorMsg(){
        return this.getElementsMyAccountPage.phoneNumberErrorMsg();
    }

    getSaveButton(){
        return this.getElementsMyAccountPage.saveButton();
    }
}