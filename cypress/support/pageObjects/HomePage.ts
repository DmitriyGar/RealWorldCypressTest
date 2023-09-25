
//export const 

export class HomePage {
   private getElementsHomePage

    constructor() {
        this.getElementsHomePage = {
            everyoneTab: () => cy.get('[role="tablist"]').find('.MuiTab-textColorInherit').eq(0).find('.MuiTab-wrapper'),
            friendsTab: () => cy.get('[role="tablist"]').find('.MuiTab-textColorInherit').eq(1).find('.MuiTab-wrapper'),
            mineTab: () => cy.get('[role="tablist"]').find('.MuiTab-textColorInherit').eq(2).find('.MuiTab-wrapper'),
            datePicker: () => cy.get('[data-test="transaction-list-filter-date-range-button"] span'),
            amountSlider: () => cy.get('[data-test="transaction-list-filter-amount-range-button"] span')
        }
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
}

export const homePage = new HomePage()