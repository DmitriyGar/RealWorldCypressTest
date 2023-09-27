

export class LoginUser {

   loginAPI (username:string,password:string)  {
        cy.log(`Logging in as ${username} via API`)
        const creds = {
          "type": "LOGIN",
          "username": `${username}`,
          "password": `${password}`
        }
        cy.request('POST', 'http://localhost:3001/login', creds).then(response => {
        expect(response.status).equal(200)
        console.log(response.body.user.username)
        expect(response.body.user.username).equal(username)
        })
    }
}