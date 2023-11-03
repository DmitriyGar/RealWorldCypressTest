
export class HomePage {

    private readonly getElementsHomePage = {
        everyoneTab: () => cy.get('[role="tablist"]').find('.MuiTab-textColorInherit').eq(0).find('.MuiTab-wrapper'),
        friendsTab: () => cy.get('[role="tablist"]').find('.MuiTab-textColorInherit').eq(1).find('.MuiTab-wrapper'),
        mineTab: () => cy.get('[role="tablist"]').find('.MuiTab-textColorInherit').eq(2).find('.MuiTab-wrapper'),
        datePicker: () => cy.get('[data-test="transaction-list-filter-date-range-button"] span'),
        amountSlider: () => cy.get('[data-test="transaction-list-filter-amount-range-button"]'),
        sliderScreenLabel: () => cy.get('[role="presentation"]').find('[data-test="transaction-list-filter-amount-range-button"]'),
        sliderScreenClearButton: () => cy.get('[role="presentation"]').find('[data-test="transaction-list-filter-amount-clear-button"] .MuiButton-label'),
        sliderScreenStartPoint: () => cy.get('[role="slider"][data-index="0"]'),
        sliderScreenEndPoint: () => cy.get('[role="slider"][data-index="1"]'),
        nameSentTransaction: (n: number) => cy.get('[data-test="transaction-list"]').find('[role="rowgroup"]')
            .find('div li div div div.MuiGrid-grid-sm-true div.MuiGrid-grid-xs-true')
            .find('p.MuiTypography-body1 span:nth-child(1)').eq(n),
        actionLabelTransaction: (n: number) => cy.get('[data-test="transaction-list"]').find('[role="rowgroup"] div').eq(n)
            .find('p span').eq(1),
        nameReceivedTransaction: (n: number) => cy.get('[data-test="transaction-list"]').find('[role="rowgroup"]')
            .find('div li div div div.MuiGrid-grid-sm-true div.MuiGrid-grid-xs-true')
            .find('p.MuiTypography-body1 span:nth-child(3)').eq(n),
        paymentLabelTransaction: (n: number) => cy.get('[data-test="transaction-list"]').find('[role="rowgroup"]')
            .find('div li div div div.MuiGrid-grid-sm-true div.MuiGrid-grid-xs-true')
            .find('p.MuiTypography-body1 span:nth-child(2)').eq(n),
        priceTransaction: (n: number) => cy.get('[data-test="transaction-list"]').find('[role="rowgroup"]')
            .find('div li div div div.MuiGrid-grid-sm-true').find('div:nth-child(2)').find('span').eq(n),
        descriptionTransaction: (n: number) => cy.get('[data-test="transaction-list"]').find('[role="rowgroup"]')
            .find('div li div div div.MuiGrid-grid-sm-true div.MuiGrid-grid-xs-true')
            .find('p.MuiTypography-body2').eq(n),
        paymentPriceTransactionById: (id: number) => cy.get(`[data-test="transaction-amount-${id}"]`),
        nameSentTransactionById: (id: number) => cy.get(`[data-test="transaction-sender-${id}"]`),
        nameReceivedTransactionById: (id: number) => cy.get(`[data-test="transaction-receiver-${id}"]`),
        paymentLabelTransactionById: (id: number) => cy.get(`[data-test="transaction-sender-${id}"]`).parent().parent()
            .contains('p', new RegExp(`${['Payment', 'Request'].join('|')}`, 'g')),
        tableTransactions: () => cy.get('[role="rowgroup"] div')
    }

    getTableTransactions() {
        return this.getElementsHomePage.tableTransactions();
    }

    getNameSentTransaction(id: number) {
        return this.getElementsHomePage.nameSentTransaction(id)
    }

    getNameReceivedTransaction(id: number) {
        return this.getElementsHomePage.nameReceivedTransaction(id)
    }

    getPaymentLabelTransaction(id: number) {
        return this.getElementsHomePage.paymentLabelTransaction(id)
    }

    getDescriptionTransaction(id: number) {
        return this.getElementsHomePage.descriptionTransaction(id)
    }

    getPaymentLabelTransactionById(id: number) {
        return this.getElementsHomePage.paymentLabelTransactionById(id)
    }

    getNameSentTransactionById(id: number) {
        return this.getElementsHomePage.nameSentTransactionById(id)
    }

    getNameReceivedTransactionById(id: number) {
        return this.getElementsHomePage.nameReceivedTransactionById(id)
    }

    getPaymentPriceTransactionValueById(id: number) {
        return this.getElementsHomePage.paymentPriceTransactionById(id)
    }

    getPriceTransaction(id: number) {
        return this.getElementsHomePage.priceTransaction(id)
    }

    getSelectedTab() {
        cy.log('Determine selected tab')
        return cy.get('[role="tablist"]').find('.Mui-selected').find('.MuiTab-wrapper')
    }

    getEveryoneTab() {
        cy.log('Get Everyone tab')
        return this.getElementsHomePage.everyoneTab()
    }

    getFriendsTab() {
        cy.log('Get Friends tab')
        return this.getElementsHomePage.friendsTab()
    }

    getMineTab() {
        cy.log('Get Mine tab')
        return this.getElementsHomePage.mineTab()
    }

    getDatePicker() {
        cy.log('Get date picker')
        return this.getElementsHomePage.datePicker()
    }

    getAmountSlider() {
        cy.log('Get amount slider')
        return this.getElementsHomePage.amountSlider()
    }

    getAmountSliderStartPoint() {
        cy.log('Get amount slider')
        return this.getElementsHomePage.sliderScreenStartPoint()
    }

    getAmountSliderEndPoint() {
        cy.log('Get amount slider')
        return this.getElementsHomePage.sliderScreenEndPoint()
    }

    getSliderScreenLabel() {
        cy.log('Get amount slider')
        return this.getElementsHomePage.sliderScreenLabel()
    }

    getSliderScreenClearButton() {
        cy.log('Get amount slider')
        return this.getElementsHomePage.sliderScreenClearButton()
    }
}
