export class ReciptPage {
    constructor() {
        this.thankyouButton = 'Thank you';
        this.espera = 'successfully'
        this.productos = 'name'
        this.tarjeta = 'tarjeta'
        this.total = 'total'
    };

    clickOnThankYouButton() {
        cy.contains(this.thankyouButton).click();
    };
    verificoProductos(name) {
        return cy.get(`[id='${name}']`);

    };
    verificoTarjeta() {
        return cy.contains('1234123412341234');;
    };
    verificoTotal(suma) {
        return cy.contains('35');
    };

    esperaRecipt() {
        cy.get('[role="progressbar"]', {timeout:30000}).should('not.exist')
        cy.contains('Purchase has been completed successfully').should('have.text','Purchase has been completed successfully');
    }
};