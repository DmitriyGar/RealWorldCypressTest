
export class SignInPage {

    private getUIelements = {
        logoIcon: () => cy.get('main div div svg'),
        signInLabel: () => cy.get('main div h1'),
        usernameLabel: () => cy.get('#username-label'),
        usernameField: () => cy.get('#username'),
        usernameError: () => cy.get('#username-helper-text'),
        passwordLabel: () => cy.get('#password-label'),
        passwordField: () => cy.get('#password'),
        passwordError: () => cy.get('#password-helper-text'),
        rememberMeCheckbox: () => cy.get('[data-test="signin-remember-me"] [type="checkbox"]'),
        rememberMeLabel: () => cy.get('[data-test="signin-remember-me"]').find('span').last(),
        signInButton: () => cy.get('button[data-test="signin-submit"]'),
        donthaveAnAccountLink: () => cy.get('[data-test="signup"]'),
        signinError: () => cy.get('[data-test="signin-error"]'),
        builtByLabel: () => cy.get('[rel="noopener noreferrer"]').parent(),
        builtByCypressLogo: () => cy.get('[rel="noopener noreferrer"]')
    }

    getLogo() {
        return this.getUIelements.logoIcon()
    }

    getSignInLabel() {
        return this.getUIelements.signInLabel()
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


    getRememberMeCheckbox() {
        return this.getUIelements.rememberMeCheckbox()
    }

    getRememberMeLabel() {
        return this.getUIelements.rememberMeLabel()
    }

    getDonthaveAnAccountLink() {
        return this.getUIelements.donthaveAnAccountLink()
    }

    getSigninError() {
        return this.getUIelements.signinError()
    }

    getBuiltByLabel() {
        return this.getUIelements.builtByLabel()
    }
    getBuiltByCypressLogo() {
        return this.getUIelements.builtByCypressLogo()
    }
    getSignInButton() {
        return this.getUIelements.signInButton()
    }

}