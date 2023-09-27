
export class SignInPage {

    private getUIelements = {
        logoIcon: () =>  cy.get('main div div svg') ,
        signInLabel: () => cy.get('main div h1'),
        usernameLabel: () => cy.get('#username-label'),
        usernameField: () => cy.get('#username'),
        passwordLabel: () => cy.get('#password-label'),
        passwordField: () => cy.get('#password'),
        rememberMeCheckbox: () => cy.get('[data-test="signin-remember-me"] [type="checkbox"]'),
        rememberMeLabel: () => cy.get('[data-test="signin-remember-me"]').find('span').last(),
        signinButton: () =>  cy.get('[data-test="signin-submit"]') ,
        donthaveAnAccountLink: () => cy.get('[data-test="signup"]'),
        builtByLabel: () =>{ },
        builtByCypressLogo: () =>{ },
    }

    getLogo(){
        return this.getUIelements.logoIcon()
    }

    getSignInLabel(){
        return this.getUIelements.signInLabel()
    }

    getUsernameLabel(){
        return this.getUIelements.usernameLabel()
    }

    getUsernameField(){
        return this.getUIelements.usernameField()
    }

    getPasswordLabel(){
        return this.getUIelements.passwordLabel()
    }

    getPasswordField(){
        return this.getUIelements.passwordField()
    }


    getRememberMeCheckbox(){
        return this.getUIelements.rememberMeCheckbox()
    }

    getRememberMeLabel(){
        return this.getUIelements.rememberMeLabel()
    }

    getDonthaveAnAccountLink(){
        return this.getUIelements.donthaveAnAccountLink()
    }

   

    getSignInButton(){
        return this.getUIelements.signinButton()
    }

}