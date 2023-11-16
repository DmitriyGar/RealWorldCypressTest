export class SignUpPage {

    private getUIelements = {
        logoIcon: () => cy.get('main div div svg'),
        signUpLabel: () => cy.get('main div h1'),
        firstNameLabel: () => cy.get('#firstName-label'),
        firstNameField: () => cy.get('#firstName'),
        firstNameError: () => cy.get('#firstName-helper-text'),
        lastNameLabel: () => cy.get('#lastName-label'),
        lastNameField: () => cy.get('#lastName'),
        lastNameError: () => cy.get('#lastName-helper-text'),
        usernameLabel: () => cy.get('#username-label'),
        usernameField: () => cy.get('#username'),
        usernameError: () => cy.get('#username-helper-text'),
        passwordLabel: () => cy.get('#password-label'),
        passwordField: () => cy.get('#password'),
        passwordError: () => cy.get('#password-helper-text'),
        confirmPasswordLabel: () => cy.get('#confirmPassword-label'),
        confirmPasswordField: () => cy.get('#confirmPassword'),
        confirmPasswordError: () => cy.get('#confirmPassword-helper-text'),
        signUpButton: () => cy.get('form button[data-test="signup-submit"]'),
        haveAnAccountLink: () => cy.get('form div div a'),
        signUpError: () => cy.get('[data-test="signup-error"]'),
        builtByLabel: () => cy.get('[rel="noopener noreferrer"]').parent(),
        builtByCypressLogo: () => cy.get('[rel="noopener noreferrer"]')
    }

    getLogo() {
        return this.getUIelements.logoIcon()
    }

    getSignUpLabel() {
        return this.getUIelements.signUpLabel()
    }
    

    getFirstNameLabel() {
        return this.getUIelements.firstNameLabel()
    }

    getFirstNameField() {
        return this.getUIelements.firstNameField()
    }

    getFirstNameError() {
        return this.getUIelements.firstNameError()
    }

    getLastNameLabel() {
        return this.getUIelements.lastNameLabel()
    }

    getLastNameField() {
        return this.getUIelements.lastNameField()
    }

    getLastNameError() {
        return this.getUIelements.lastNameError()
    }

    getUsernameLabel() {
        return this.getUIelements.usernameLabel()
    }

    getUsernameField() {
        return this.getUIelements.usernameField()
    }

    getUsernameError() {
        return this.getUIelements.usernameError()
    }

    getPasswordError() {
        return this.getUIelements.passwordError()
    }

    getPasswordLabel() {
        return this.getUIelements.passwordLabel()
    }

    getPasswordField() {
        return this.getUIelements.passwordField()
    }

    getConfirmPasswordError() {
        return this.getUIelements.confirmPasswordError()
    }

    getConfirmPasswordLabel() {
        return this.getUIelements.confirmPasswordLabel()
    }

    getConfirmPasswordField() {
        return this.getUIelements.confirmPasswordField()
    }

    getHaveAnAccountLink() {
        return this.getUIelements.haveAnAccountLink()
    }

    getSignUpError() {
        return this.getUIelements.signUpError()
    }

    getBuiltByLabel() {
        return this.getUIelements.builtByLabel()
    }
    getBuiltByCypressLogo() {
        return this.getUIelements.builtByCypressLogo()
    }
    getSignUpButton() {
        return this.getUIelements.signUpButton()
    }
}