export class SignUpPage {

    private getUIelements = {
        logoIcon: () => cy.get('main div div svg'),
        signUpLabel: () => cy.get('main div h1'),
        firstNameLabel: () => cy.get('#username-label'),
        firstNameField: () => cy.get('#username'),
        firstNameError: () => cy.get('#username-helper-text'),
        lastNameLabel: () => cy.get('#username-label'),
        lastNameField: () => cy.get('#username'),
        lastNameError: () => cy.get('#username-helper-text'),
        usernameLabel: () => cy.get('#username-label'),
        usernameField: () => cy.get('#username'),
        usernameError: () => cy.get('#username-helper-text'),
        passwordLabel: () => cy.get('#password-label'),
        passwordField: () => cy.get('#password'),
        passwordError: () => cy.get('#password-helper-text'),
        confirmPasswordLabel: () => cy.get('#password-label'),
        confirmPasswordField: () => cy.get('#password'),
        confirmPasswordError: () => cy.get('#password-helper-text'),
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