export class #goShoppingCart {
    constructor() {
        this.shoppingCart = '#registertoggle'
    }

    dobleClickRegister() {
        cy.get(this.register).dblclick();
    }

}