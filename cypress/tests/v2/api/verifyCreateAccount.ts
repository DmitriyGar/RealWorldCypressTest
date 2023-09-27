import { ApiObjectBase } from "../../../support/apiObjects/apiObjectBase"

describe('Create account via API', () => {

    it.only('Send request for creating user', () => {
        let apiObjectBase = new ApiObjectBase();
        let userName:string='denny_kole3'
        let firstName:string='danny3'
        let lastName:string='kole3'
        let password:string='test1234'
        
        apiObjectBase.createUserAPI.createUserRequest(userName,firstName,lastName,password)
        apiObjectBase.loginUserAPI.loginAPI(userName,password)
        })

})
