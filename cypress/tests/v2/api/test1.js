describe('api test1',() =>{

    beforeEach('preconditions',()=>{
        cy.visit('/')
        cy.login()
    })
it.only('First test -> send money',()=>{
    const pay=122
    cy.intercept('POST','http://localhost:3001/transactions').as('postTransaction')

    cy.contains('.MuiButton-label','New').click()
    cy.get('[class="MuiPaper-root makeStyles-paper-54 MuiPaper-elevation0 MuiPaper-rounded"]').then(search => {
    cy.wrap(search).find('#user-list-search-input').type('devon')
    cy.wrap(search).find('[data-test="users-list"]').each(item =>{
        cy.wrap(item).contains('span','Devon Becker').click()
        cy.get('[class="MuiGrid-root MuiGrid-container MuiGrid-direction-xs-column MuiGrid-align-items-xs-center"]')
        .find('[class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary MuiTypography-gutterBottom"]')
        .invoke('prop','innerText').should('contain','Devon Becker')
    })
    
    cy.get('#amount').type(pay)
    cy.get('#transaction-create-description-input').type('test_note')
    cy.contains('[data-test="transaction-create-submit-payment"]','Pay').click()
    cy.get('[class="MuiBox-root MuiBox-root-67"]').find('[class="MuiTypography-root MuiTypography-h6 MuiTypography-colorPrimary MuiTypography-gutterBottom"]')
    .invoke('prop','innerText').should('contain','Paid $'+pay.toFixed(2)+' for test_note')
    })

    cy.wait('@postTransaction')
	cy.get('@postTransaction').then (pay, xhr =>{
		console.log(xhr)
	expect(xhr.response.statusCode).to.equal(200)
    expect(xhr.response.body.transaction.description).to.equal('test_note')
    expect((xhr.response.body.transaction.amount)/100).to.equal(pay)
    })
})
})