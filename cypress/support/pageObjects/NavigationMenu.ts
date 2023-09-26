
export class NavigationMenu {

    private readonly elementsLeftNavMenu = {
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

    getElementsLeftNavMenu(){
    return this.elementsLeftNavMenu
    }

    getHideShowLeftNavMenuButton() {
        cy.log('Get hide/show left nav menu button');
        return  this.elementsLeftNavMenu.hideShowButton()
    }

    checkLeftNavMenuState (){
        cy.log('Chch if left nav menu hidden');
        cy.get('header').invoke('attr','class').then(attr =>{
            if ((attr+'').includes('makeStyles-appBarShift')) {
                this.elementsLeftNavMenu.userName().should('be.visible')
                this.elementsLeftNavMenu.firstName().should('be.visible')
                this.elementsLeftNavMenu.lastName().should('be.visible')
            } else {
                this.elementsLeftNavMenu.userName().should('not.be.visible')
                this.elementsLeftNavMenu.firstName().should('not.be.visible')
                this.elementsLeftNavMenu.lastName().should('not.be.visible')
            }
        })
    }

    openHomePage() {
        cy.log('Click Home page item on left nav menu')
        this.elementsLeftNavMenu.homePageItem().click()
    }

    openMyAccountPage() {
        cy.log('Click Account page item on left nav menu')
        this.elementsLeftNavMenu.myAccountPageItem().click()
    }

    openBankAccountsPage() {
        cy.log('Click Bank Account page item on left nav menu')
        this.elementsLeftNavMenu.bankAccountsPageItem().click()
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
        this.elementsLeftNavMenu.notificationPageItem().click()
        cy.url().should('contain', '/notifications')
        cy.get('[data-test="main"]').find('div .MuiPaper-root').then(form => {
            cy.wrap(form).find('h2.MuiTypography-root').should('contain', 'Notifications')
        })
    }

    logout() {
        cy.log('Click Logout item on left nav menu')
        this.elementsLeftNavMenu.logoutItem().click()
        cy.url().should('contain', '/signin')
        cy.get('#root').find('h1').should('contain', 'Sign in').then(check => {
            expect(localStorage.getItem('authState')).to.contain('\"value\":\"unauthorized\"')
        })
    }
}


