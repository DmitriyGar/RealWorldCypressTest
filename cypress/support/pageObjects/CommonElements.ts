
export class CommonElements {
    private elementsOnboardingWindow = {
        // Onboarding window appears after first logging into the app
        dialogWindowSection: () => cy.get('div[role="dialog"]'),
        onboardingTitle: () => cy.get('[data-test="user-onboarding-dialog-title"] h2'),
        onboardingLogo: () => cy.get('[data-test="user-onboarding-dialog-content"] div svg'),
        onboardingText: () => cy.get('[data-test="user-onboarding-dialog-content"] div p'),
        onboardingNextButton: () => cy.get('[data-test="user-onboarding-next"]'),
        //next screen of the same window:
        bankNameField: () => cy.get('#bankaccount-bankName-input'),
        bankNameFieldError: () => cy.get('#bankaccount-bankName-input-helper-text'),
        routingNumberField: () => cy.get('#bankaccount-routingNumber-input'),
        routingNumberFieldError: () => cy.get('#bankaccount-routingNumber-input-helper-text'),
        accountNumberField: ()=> cy.get('#bankaccount-accountNumber-input'),
        accountNumberFieldError: ()=> cy.get('#bankaccount-accountNumber-input-helper-text'),
        saveButton: () => cy.get('[data-test="bankaccount-submit"]')
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
    
    getOnboardingNextButton() {
        return this.elementsOnboardingWindow.onboardingNextButton()
    }
}