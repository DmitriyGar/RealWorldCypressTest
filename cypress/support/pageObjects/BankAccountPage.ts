
export class BankAccountsPage {

    private readonly getElementsBankAccountsPage = {
        title: () => cy.get('main h2'),
        bankAccountName: (n: number = 0) => cy.get('[data-test="bankaccount-list"] li div div p').eq(n),
        bankAccountRows: () => cy.get('[data-test="bankaccount-list"] li'),
        createButton: () => cy.get('[data-test="bankaccount-new"]'),
        deleteButton: (n: number = 0) => cy.get('[data-test="bankaccount-list"] li div div button').eq(n),
        //new bank account screen:
        bankNameField: () => cy.get('#bankaccount-bankName-input'),
        bankNameFieldError: () => cy.get('#bankaccount-bankName-input-helper-text'),
        routingNumberField: () => cy.get('#bankaccount-routingNumber-input'),
        routingNumberFieldError: () => cy.get('#bankaccount-routingNumber-input-helper-text'),
        accountNumberField: () => cy.get('#bankaccount-accountNumber-input'),
        accountNumberFieldError: () => cy.get('#bankaccount-accountNumber-input-helper-text'),
        newBankAccountSaveButton: () => cy.get('[data-test="bankaccount-submit"]')
    }

    getTitle() {
        return this.getElementsBankAccountsPage.title();
    }

    getBankAccountName(n: number = 0) {
        return this.getElementsBankAccountsPage.bankAccountName(n);
    }

    getBankAccountNames() {
        return this.getElementsBankAccountsPage.bankAccountRows();
    }

   getBankAccountItemByName (){
   
    }

    createNewBankAccountItem(){

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

    getNewBankAccountSaveButton() {
        return this.getElementsBankAccountsPage.newBankAccountSaveButton();
    }
}