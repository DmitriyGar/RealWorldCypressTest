import { ApiObjectBase } from "../../../apiObjects/apiObjectBase"
import testData from "../../../testData/testDataNewUser.json"
let apiObjectBase = new ApiObjectBase();

export function sendTransactionsBetweenUsersAPI(username1: string, firstName2: string, amount: string, description: string) {
    cy.clearAllCookies().clearAllLocalStorage().clearAllSessionStorage()
    apiObjectBase.loginUserAPI.loginAPI(username1, testData.password)
        .then(xhr1 => {
            apiObjectBase.searchTransactions.searchTransaction(firstName2)
                .then(results => {
                    let array: string[] = results
                    for (let item of results) {
                        if (item.firstName == firstName2) {
                            cy.wrap(item.id).then(id => {
                                apiObjectBase.sendGetTransactions.sendTransaction(xhr1.id, String(id), amount)
                            })
                        }
                    }
                })
        })
}

export function requestTransactionsBetweenUsersAPI(username1: string, firstName2: string, amount: string, description: string) {
    cy.clearAllCookies().clearAllLocalStorage().clearAllSessionStorage()
    apiObjectBase.loginUserAPI.loginAPI(username1, testData.password)
        .then(xhr1 => {
            apiObjectBase.searchTransactions.searchTransaction(firstName2)
                .then(results => {
                    let array: string[] = results
                    for (let item of results) {
                        if (item.firstName == firstName2) {
                            cy.wrap(item.id).then(id => {
                                apiObjectBase.sendGetTransactions.requestTransaction(xhr1.id, String(id), amount)
                            })
                        }
                    }
                })
        })
}