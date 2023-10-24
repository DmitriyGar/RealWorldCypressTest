
export class HomePage {
    
   private readonly getElementsHomePage = {
            everyoneTab: () => cy.get('[role="tablist"]').find('.MuiTab-textColorInherit').eq(0).find('.MuiTab-wrapper'),
            friendsTab: () => cy.get('[role="tablist"]').find('.MuiTab-textColorInherit').eq(1).find('.MuiTab-wrapper'),
            mineTab: () => cy.get('[role="tablist"]').find('.MuiTab-textColorInherit').eq(2).find('.MuiTab-wrapper'),
            datePicker: () => cy.get('[data-test="transaction-list-filter-date-range-button"] span'),
            amountSlider: () => cy.get('[data-test="transaction-list-filter-amount-range-button"]'),
            sliderScreenLabel: ()=> cy.get('[role="presentation"]').find('[data-test="transaction-list-filter-amount-range-button"]'),
            sliderScreenClearButton: ()=> cy.get('[role="presentation"]').find('[data-test="transaction-list-filter-amount-clear-button"] .MuiButton-label'),
            sliderScreenStartPoint: () => cy.get('[role="slider"][data-index="0"]'),
            sliderScreenEndPoint: () => cy.get('[role="slider"][data-index="1"]'),
            nameSentTransaction: (n:number)=> cy.get('[data-test="transaction-list"]').find('[role="rowgroup"] div').eq(n)
            .find('p span').eq(0),
            actionLabelTransaction: (n:number)=> cy.get('[data-test="transaction-list"]').find('[role="rowgroup"] div').eq(n)
            .find('p span').eq(1),
            nameReceivedTransaction: (n:number)=> cy.get('[data-test="transaction-list"]').find('[role="rowgroup"] div').eq(n)
            .find('p span').eq(2),
            paymentLabelTransaction: (n:number) => cy.get('[data-test="transaction-list"]').find('[role="rowgroup"] div').eq(n)
            .find('p span').eq(0).parent().parent().find('p').eq(1),
            paymentPriceTransaction: (n:number) => cy.get('[data-test="transaction-list"]').find('[role="rowgroup"] div').eq(n)
            .find('li div div div.MuiGrid-grid-sm-true div.MuiGrid-item span'),
            paymentPriceTransactionById: (id:number) => cy.get(`[data-test="transaction-amount-${id}"]`),
            nameSentTransactionById: (id:number) => cy.get(`[data-test="transaction-sender-${id}"]`),
            nameReceivedTransactionById: (id:number) => cy.get(`[data-test="transaction-receiver-${id}"]`),
            paymentLabelTransactionById: (id:number) => cy.get(`[data-test="transaction-sender-${id}"]`).parent().parent()
            .contains('p',new RegExp(`${['Payment', 'Request'].join('|')}`, 'g')),
            tableTransactions: ()=> cy.get('[role="rowgroup"] div')
    }

    getTableTransactions(){
        return this.getElementsHomePage.tableTransactions();
    }
/*
    getTransaction(n:number){
        this.getElementsHomePage.nameSentTransaction(n).should('contain','Kaylin Homenick');
        this.getElementsHomePage.actionLabelTransaction(n).should('contain','paid');
        this.getElementsHomePage.nameReceivedTransaction(n).should('contain','Arely Kertzmann');
        this.getElementsHomePage.paymentLabelTransaction(n).should('contain','Payment');
        this.getElementsHomePage.paymentPriceTransaction(n).invoke('prop', 'innerText').should('equal','-$80.31');
    }
*/
    getPaymentLabelTransactionById(id:number){
        return this.getElementsHomePage.paymentLabelTransactionById(id)
     }

     getPaymentLabelTransaction(id:number){
        return this.getElementsHomePage.paymentLabelTransaction(id)
     }

    getNameSentTransactionById(id:number){
       return this.getElementsHomePage.nameSentTransactionById(id)
    }

    getNameReceivedTransactionById(id:number){
        return this.getElementsHomePage.nameReceivedTransactionById(id)
     }

    getPaymentPriceTransactionValueById(id:number){
        return this.getElementsHomePage.paymentPriceTransactionById(id)
     }

     getPaymentPriceTransaction(id:number){
        return this.getElementsHomePage.paymentPriceTransaction(id)
     }

    getSelectedTab(){
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
