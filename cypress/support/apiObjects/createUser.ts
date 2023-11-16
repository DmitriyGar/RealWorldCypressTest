
export class CreateUserAPI {
    createUserRequest(userName:string,firstName:string,lastName:string,password:string){

        cy.log(`Create account request with parameters: username: ${userName}, firstName: ${firstName},lastName: ${lastName}, password: ${password}`)
        cy.request({

            url: 'http://localhost:3001/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/plain, */*',
            },
            body: `{"firstName":"${firstName}","lastName":"${lastName}","username":"${userName}","password":"${password}","confirmPassword":"${password}"}`
        }).then(response => {
            expect(response.status).to.equal(201)
            expect(response.body.user.username).to.equal(userName)
            expect(response.body.user.firstName).to.equal(firstName)
            expect(response.body.user.lastName).to.equal(lastName)
            console.log(response.body.user)
    })
}
}