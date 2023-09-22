var verifyLeftNavMenuIsShown = (className: any) => {
    cy.get('header').invoke('attr', 'class').should('equal', className)
}
var verifyLeftNavMenuIsHidden = (className: any) => {
    cy.get('header').invoke('attr', 'class').should('not.equal', className)
}



export class NavigationMenu {

    hideShowMenu() {
            cy.get('header').invoke('attr', 'class').then(classNameBefore => {
            verifyLeftNavMenuIsShown(classNameBefore)
            cy.get('[data-test="drawer-icon"]').click()
            verifyLeftNavMenuIsHidden(classNameBefore)
            cy.get('[data-test="drawer-icon"]').click()
            verifyLeftNavMenuIsShown(classNameBefore)
        })
    }

    checkUIElementsOnLeftNavMenu(){
        cy.get('[data-test="sidenav"]').find('.MuiAvatar-circular img')
        .should('have.attr','src','https://cypress-realworld-app-svgs.s3.amazonaws.com/t45AiwidW.svg')
        cy.get('[data-test="sidenav-username"]').should('contain', 'Katharina_Bernier')
        cy.get('[data-test="sidenav-user-full-name"]').first().should('contain', 'Edgar')
        cy.get('[data-test="sidenav-user-full-name"]').last().should('contain', 'J')
        cy.get('[data-test="sidenav-user-balance"]').should('not.be.empty')
        cy.get('[data-test="sidenav-user-balance"]').parent('div').find('.MuiTypography-gutterBottom')
        .should('contain','Account Balance')
    }

    openHomePage(){
        cy.contains('span','Home').click()
        cy.get('[role="tablist"]').then(tab =>{
             cy.wrap(tab).find('.MuiTab-textColorInherit').eq(0).find('.MuiTab-wrapper').should('be.visible').and('contain','Everyone')
             cy.wrap(tab).find('.MuiTab-textColorInherit').eq(1).find('.MuiTab-wrapper').should('be.visible').and('contain','Friends')
             cy.wrap(tab).find('.MuiTab-textColorInherit').eq(2).find('.MuiTab-wrapper').should('be.visible').and('contain','Mine')
        })
        cy.wait(500)
        cy.get('[data-test="transaction-list-filter-date-range-button"] span').should('be.visible').and('contain','Date: ALL')
        cy.get('[data-test="transaction-list-filter-amount-range-button"] span').should('be.visible').and('contain','Amount:')

    }

    openMyAccountPage(){
        cy.contains('span','My Account').click()
        cy.url().should('contain','/user/settings')
        cy.get('[data-test="main"]').find('div .MuiPaper-root').then(form =>{
            cy.wrap(form).find('h2.MuiTypography-root').should('contain','User Settings')
            cy.wrap(form).find('.MuiGrid-item svg').should('be.visible')
            cy.wrap(form).find('#user-settings-firstName-input').invoke('attr','value').should('contain','Edgar')
            cy.wrap(form).find('#user-settings-lastName-input').invoke('attr','value').should('contain','Johns')
            cy.wrap(form).find('#user-settings-email-input').invoke('attr','value').should('contain','Norene39@yahoo.com')
            cy.wrap(form).find('#user-settings-phoneNumber-input').invoke('attr','value').should('contain','625-316-9882')
            cy.wrap(form).find('[data-test="user-settings-submit"]').should('be.visible').and('be.enabled')
        })
    }

    openBankAccountsPage(){
        cy.contains('span','Bank Accounts').click()
        cy.url().should('contain','/bankaccounts')
        cy.get('[data-test="main"]').find('div .MuiPaper-root').then(form =>{
            cy.wrap(form).find('h2.MuiTypography-root').should('contain','Bank Accounts')
            cy.wrap(form).find('[data-test="bankaccount-new"]').should('be.visible')
            .find('.MuiButton-label').should('contain','Create')
            cy.wrap(form).find('[data-test="bankaccount-delete"]').should('be.visible')
            .find('.MuiButton-label').should('contain','Delete')
        })
    }

    openNotificationsPage(){
        cy.contains('span','Notifications').click()
        cy.url().should('contain','/notifications')
        cy.get('[data-test="main"]').find('div .MuiPaper-root').then(form =>{
            cy.wrap(form).find('h2.MuiTypography-root').should('contain','Notifications')
        })
    }

    logout(){
        cy.wait(1000)
        cy.contains('span','Logout').click()
        cy.url().should('contain','/signin')
        cy.get('#root').find('h1').should('contain','Sign in').then(check =>{
               expect(localStorage.getItem('authState')).to.contain('\"value\":\"unauthorized\"')
        })
        
    }

}



export var leftNavigationMenu: NavigationMenu = new NavigationMenu();

