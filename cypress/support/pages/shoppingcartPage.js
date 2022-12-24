export class ShoppingcartPage {
    constructor() {
        this.ShowTotalPrice = 'Show total price'
        this.price = '#productPrice'
        this.nombre = '#productName'
        this.checkoutButton = 'Go to Checkout'
    };

    clickShowTotalPrice() {
        cy.contains(this.ShowTotalPrice).click()

    };
    VerificoProductos(name) {
        return cy.get(`[name='${name}']`);

    }
    VerificoPrecios(name) {
        return cy.get(`[name='${name}']`).siblings('#productPrice');        

    }
    ValorSumaProductos() {
        return cy.contains('35');
    }
    clickCheckoutButton() {
        cy.contains(this.checkoutButton).click();
    }

};