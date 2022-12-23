export class ProductsPage {

    constructor() {

        this.closeModalButton = '#closeModal'
        this.shoppingCartButton = '#goShoppingCart'
    }

    agregarproducto(producto) {
        cy.get(`[value='${producto}']`).click();
        cy.get(this.closeModalButton).click();
    };

    goShoppingCartButton() {
        cy.get(this.shoppingCartButton).click();
    }

}