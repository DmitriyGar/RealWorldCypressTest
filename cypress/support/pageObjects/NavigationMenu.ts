import { te } from "date-fns/locale"

var verifyLeftNavMenuIsShown = (className: any) => {
    cy.get('header').invoke('attr', 'class').should('equal', className)
}
var verifyLeftNavMenuIsHidden = (className: any) => {
    cy.get('header').invoke('attr', 'class').should('not.equal', className)
}

export const getElementsLeftNavMenu = {
    hideShowButton: () => cy.get('[data-test="drawer-icon"]'),
    profieIcon: () => cy.get('[data-test="sidenav"]').find('.MuiAvatar-circular img'),
    firstName: () => cy.get('[data-test="sidenav-user-full-name"]').first(),
    lastName: () => cy.get('[data-test="sidenav-user-full-name"]').last(),
    userName: () => cy.get('[data-test="sidenav-username"]'),
    amount: () => cy.get('[data-test="sidenav-user-balance"]'),
    accBalanceLabel: () => cy.get('[data-test="sidenav-user-balance"]').parent('div').find('.MuiTypography-gutterBottom'),
    homePageItem: () => cy.contains('span', 'Home'),
    myAccountPageItem: () => cy.contains('span', 'My Account'),
    bankAccountsPageItem: () => cy.contains('span', 'Bank Accounts'),
    notificationPageItem: () => cy.contains('span', 'Notifications'),
    logoutItem: () => cy.contains('span', 'Logout')
}



export class NavigationMenu {

    getHideShowLeftNavMenuButton() {
        cy.log('Get hide/show left nav menu button');
        return  getElementsLeftNavMenu.hideShowButton()
    }

    checkLeftNavMenuState (){
        cy.log('Chch if left nav menu hidden');
        cy.get('header').invoke('attr','class').then(attr =>{
            if ((attr+'').includes('makeStyles-appBarShift')) {
                getElementsLeftNavMenu.userName().should('be.visible')
                getElementsLeftNavMenu.firstName().should('be.visible')
                getElementsLeftNavMenu.lastName().should('be.visible')
            } else {
                getElementsLeftNavMenu.userName().should('not.be.visible')
                getElementsLeftNavMenu.firstName().should('not.be.visible')
                getElementsLeftNavMenu.lastName().should('not.be.visible')
            }
        })
    }

    openHomePage() {
        cy.log('Click Home page item on left nav menu')
        getElementsLeftNavMenu.homePageItem().click()
    }

    openMyAccountPage() {
        cy.log('Click Account page item on left nav menu')
        getElementsLeftNavMenu.myAccountPageItem().click()
    }

    openBankAccountsPage() {
        cy.log('Click Bank Account page item on left nav menu')
        getElementsLeftNavMenu.bankAccountsPageItem().click()
        cy.get('[data-test="main"]').find('div .MuiPaper-root').then(form => {
            cy.wrap(form).find('h2.MuiTypography-root').should('contain', 'Bank Accounts')
            cy.wrap(form).find('[data-test="bankaccount-new"]').should('be.visible')
                .find('.MuiButton-label').should('contain', 'Create')
            cy.wrap(form).find('[data-test="bankaccount-delete"]').should('be.visible')
                .find('.MuiButton-label').should('contain', 'Delete')
        })
    }

    openNotificationsPage() {
        cy.log('Click Notification page item on left nav menu')
        getElementsLeftNavMenu.notificationPageItem().click()
        cy.url().should('contain', '/notifications')
        cy.get('[data-test="main"]').find('div .MuiPaper-root').then(form => {
            cy.wrap(form).find('h2.MuiTypography-root').should('contain', 'Notifications')
        })
    }

    logout() {
        cy.log('Click Logout item on left nav menu')
        getElementsLeftNavMenu.logoutItem().click()
        cy.url().should('contain', '/signin')
        cy.get('#root').find('h1').should('contain', 'Sign in').then(check => {
            expect(localStorage.getItem('authState')).to.contain('\"value\":\"unauthorized\"')
        })
    }
}



export var leftNavigationMenu: NavigationMenu = new NavigationMenu();

