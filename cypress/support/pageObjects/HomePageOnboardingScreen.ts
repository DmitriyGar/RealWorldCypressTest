
export class HomePageOnboardingScreen {
    private elementsOnboardingWindow = {
        // Onboarding window appears after first logging into the app
        dialogWindowSection: () => cy.get('div[role="dialog"]'),
        onboardingTitle: () => cy.get('[data-test="user-onboarding-dialog-title"] h2'),
        onboardingLogo: () => cy.get('[data-test="user-onboarding-dialog-content"] div svg'),
        onboardingText: () => cy.get('[data-test="user-onboarding-dialog-content"] div p'),
        onboardingNextButton: () => cy.get('[data-test="user-onboarding-next"]'), //1st screen and 3rd screen 'Done' button
        //2nd screen of the same window:
        bankNameField: () => cy.get('#bankaccount-bankName-input'),
        bankNameFieldError: () => cy.get('#bankaccount-bankName-input-helper-text'),
        routingNumberField: () => cy.get('#bankaccount-routingNumber-input'),
        routingNumberFieldError: () => cy.get('#bankaccount-routingNumber-input-helper-text'),
        accountNumberField: ()=> cy.get('#bankaccount-accountNumber-input'),
        accountNumberFieldError: ()=> cy.get('#bankaccount-accountNumber-input-helper-text'),
        onboardingSaveButton: () => cy.get('[data-test="bankaccount-submit"]'),
        //3d finish screen of the same window:
        onboardingDoneButton: () => cy.get('[data-test="user-onboarding-next"] .MuiButton-label')
    }

    getDialogWindowSection() {
        return this.elementsOnboardingWindow.dialogWindowSection()
    }

    getOnboardingTitle() {
        return this.elementsOnboardingWindow.onboardingTitle()
    }

    getOnboardingLogo() {
        return this.elementsOnboardingWindow.onboardingLogo()
    }

    getOnboardingText() {
        return this.elementsOnboardingWindow.onboardingText()
    }
    
    getNextButton() {
        return this.elementsOnboardingWindow.onboardingNextButton()
    }

    getBankNameField() {
        return this.elementsOnboardingWindow.bankNameField()
    }

    getBankNameFieldError() {
        return this.elementsOnboardingWindow.bankNameFieldError()
    }

    getRoutingNumberField() {
        return this.elementsOnboardingWindow.routingNumberField()
    }

    getRoutingNumberFieldError() {
        return this.elementsOnboardingWindow.routingNumberFieldError()
    }

    getAccountNumberField() {
        return this.elementsOnboardingWindow.accountNumberField()
    }

    getAccountNumberFieldError() {
        return this.elementsOnboardingWindow.accountNumberFieldError()
    }

    getSaveButton() {
        return this.elementsOnboardingWindow.onboardingSaveButton()
    }

    getDoneButton() {
        return this.elementsOnboardingWindow.onboardingDoneButton()
    }
}