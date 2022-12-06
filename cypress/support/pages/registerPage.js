export class RegisterPage {
    constructor() {
        this.register = '#registertoggle'
    }

    dobleClickRegister() {
        cy.get(this.register).dblclick();
    }

}