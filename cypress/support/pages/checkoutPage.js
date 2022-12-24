export class CheckoutPage {
    constructor() {
        this.nombreInput = '#FirstName',
        this.apellidoInput = '#lastName',
        this.numeroTarjetaInput = '#cardNumber',
        this.purchaseButton = 'Purchase'
    }

    escribirNombre(name) {
        cy.get(this.nombreInput).type(name);
    };
    escribirApellido(lastname) {
        cy.get(this.apellidoInput).type(lastname)
    };
    escribirNumeroTarjeta(tarjetaDeCredito) {
        cy.get(this.numeroTarjetaInput).type(tarjetaDeCredito);
    };
    clickPurchaseButton() {
        cy.contains(this.purchaseButton).click();
    };




};