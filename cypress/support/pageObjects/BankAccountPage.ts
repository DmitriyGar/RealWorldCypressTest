export class BankAccountsPage {
    
    private readonly getElementsBankAccountsPage = {
        title: () => cy.get('main h2'),
        bankAccountName: ()=> cy.get('[data-test="bankaccount-list"] li div div p'),
        createButton: ()=> cy.get('[data-test="bankaccount-new"]'),
        deleteButton: ()=> cy.get('[data-test="bankaccount-list"] li div div button'),
        //new bank account:
        bankNameField: () => cy.get('#bankaccount-bankName-input'),
        bankNameFieldError: () => cy.get('#bankaccount-bankName-input-helper-text'),
        routingNumberField: () => cy.get('#bankaccount-routingNumber-input'),
        routingNumberFieldError: () => cy.get('#bankaccount-routingNumber-input-helper-text'),
        accountNumberField: ()=> cy.get('#bankaccount-accountNumber-input'),
        accountNumberFieldError: ()=> cy.get('#bankaccount-accountNumber-input-helper-text'),
        onboardingSaveButton: () => cy.get('[data-test="bankaccount-submit"]')
    }

    getTitle() {
        return this.getElementsBankAccountsPage.title();
    }

    getBankAccountName() {
        return this.getElementsBankAccountsPage.bankAccountName();
    }

    getCreateButton() {
        return this.getElementsBankAccountsPage.createButton();
    }

    getDeleteButton() {
        return this.getElementsBankAccountsPage.deleteButton();
    }

    getBankNameField() {
        return this.getElementsBankAccountsPage.bankNameField();
    }

    getRoutingNumberField() {
        return this.getElementsBankAccountsPage.routingNumberField();
    }

    getRoutingNumberFieldError() {
        return this.getElementsBankAccountsPage.routingNumberFieldError();
    }

    getAccountNumberField() {
        return this.getElementsBankAccountsPage.accountNumberField();
    }

    getAccountNumberFieldError() {
        return this.getElementsBankAccountsPage.accountNumberFieldError();
    }

    getOnboardingSaveButton() {
        return this.getElementsBankAccountsPage.onboardingSaveButton();
    }   
}