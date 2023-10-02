
export class CommonElements {
    private elementsOnboardingWindow = {
        // Onboarding window appears after first logging into the app
        dialogWindowSection: () => cy.get('div[role="dialog"]'),
        onboardingTitle: () => cy.get('[data-test="user-onboarding-dialog-title"] h2'),
        onboardingLogo: () => cy.get('[data-test="user-onboarding-dialog-content"] div svg'),
        onboardingText: () => cy.get('[data-test="user-onboarding-dialog-content"] div p'),
        onboardingNextButton: () => cy.get('[data-test="user-onboarding-next"]')
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