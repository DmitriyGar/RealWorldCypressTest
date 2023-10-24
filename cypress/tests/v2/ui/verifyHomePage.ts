import { Pages } from "../../../support/pageObjects/Pages"
import { negativeOrPositiveAmountWrapper } from "../../../support/helpers/HelpMethods";
import testData from "../../../support/testData/testDataExistingUser.json"


let pages = new Pages();


describe('Verify Home page', () => {

    beforeEach('Preconditions', () => {
        cy.visit('/')
        cy.loginUI(testData.userName,testData.password)
    })

    var checkTransactionsUImatchAPI2 = function (page: number = 1) {
        
        let shift = 0;
   /*
        const fs = require('fs');
        let str=fs.writeFileSync("./tests/v2/ui/text1.txt","hello");
        console.log(str)*/
       
     /*    while (shift<3712){
            cy.get('[aria-label="grid"]').focus().scrollTo('0', shift)

            

           const element = document.querySelector('div.ReactVirtualized__Grid__innerScrollContainer')!
            const style=element.getAttribute("style")
           
            //const style=getComputedStyle(element)
            console.log(style)

            cy.get('[data-test="transaction-list"] [role="grid"] [role="rowgroup"]').find(`[style="height: 128px; left: 0px; position: absolute; top: ${shift}px; width: 100%;"]`).find('li div div div.MuiGrid-grid-sm-true div:nth-child(2) span.MuiTypography-root')
        shift=shift+128;
        }*/
    }



    it('Verify UI elements presence on Home Page', () => {
        pages.navigationMenu.openHomePage();
        pages.homePage.getSelectedTab().should('contain', 'Everyone')
        pages.homePage.getEveryoneTab().should('be.visible')
        pages.homePage.getEveryoneTab().should('contain', 'Everyone')
        pages.homePage.getFriendsTab().should('be.visible')
        pages.homePage.getFriendsTab().should('contain', 'Friends')
        pages.homePage.getMineTab().should('be.visible')
        pages.homePage.getMineTab().should('contain', 'Mine')
        pages.homePage.getDatePicker().should('be.visible')
        pages.homePage.getDatePicker().should('contain', 'ALL')
        pages.homePage.getAmountSlider().should('be.visible')
        pages.homePage.getAmountSlider().should('contain', 'Amount:')
    })

    it('Verify transactions on EVERYONE tab of Home Page match API', () => {

        var checkTransactionsUImatchAPI = function (page: number = 1) {
            let parametr: string = ''
            if (page > 1) {
                parametr = `/?page=${page}`
            }
            cy.request({
                url: `http://localhost:3001/transactions/public${parametr}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                }
            }).then(response => {
                expect(response.status).to.equal(200)
                console.log(response.body)
                for (let n = 0; n < response.body.results.length; n++) {
                    pages.homePage.getPaymentPriceTransactionValueById(response.body.results[n].id).invoke('prop', 'innerText')
                        .should('equal', negativeOrPositiveAmountWrapper(response.body.results[n].amount, response.body.results[n].requestStatus, response.body.results[n].status))
                    pages.homePage.getNameSentTransactionById(response.body.results[n].id).invoke('prop', 'innerText')
                        .should('equal', response.body.results[n].senderName)
                    pages.homePage.getNameReceivedTransactionById(response.body.results[n].id).invoke('prop', 'innerText')
                        .should('equal', response.body.results[n].receiverName)
                    pages.homePage.getPaymentLabelTransactionById(response.body.results[n].id).invoke('prop', 'innerText')
                        .should('equal', response.body.results[n].description)
                    if (n == response.body.results.length - 1) {
                        page++;
                        cy.get('[aria-label="grid"]').focus().scrollTo('bottom')
                        checkTransactionsUImatchAPI(page)
                    }
                }
            }
            )
        }

        pages.navigationMenu.openHomePage();
  
        checkTransactionsUImatchAPI();
    })


    it.skip('Verify transactions on MINE tab of Home Page match API', () => {

        pages.navigationMenu.openHomePage();
        cy.wait(500)
        let n=1
        let shift=0;
        while(n<30){
        cy.get('[data-test="transaction-list"]').find('[role="rowgroup"]').find('div')
          .find('li div div div.MuiGrid-grid-sm-true div.MuiGrid-item span').eq(n)
          shift+=128
        cy.get('[aria-label="grid"]').focus().scrollTo(0,shift)
        cy.wait(500)
        n++
        }

       /* pages.homePage.getTableTransactions().invoke('attr','style').then( (css)=>{
            let array:string[]|undefined=[];
            if (typeof(css)==='string'){
            array=css.toString().split('; ')
            let height=Number(array[1].split(': ')[1].slice(0,-2))
            console.log(height)
            cy.get('[aria-label="grid"]').focus().scrollTo('top')
            console.log(css)
            }
        })
 */
    })

})


