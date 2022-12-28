export class ReciptPage {
    constructor() {
        this.thankyouButton = 'Thank you';
        this.espera = 'successfully'
        this.nombre = 'nombre'
        this.productos = 'name'
        this.tarjeta = 'tarjeta'
        this.total = 'total'
    };

    clickOnThankYouButton() {
        cy.contains(this.thankyouButton).click();
    };

    verificoNombre() {
        return cy.get('#name');
    };
    
    verificoProductos(name) {
        return cy.get(`[id='${name}']`);

    };
    verificoTarjeta() {
        return cy.get('#creditCard');
    };
    verificoTotal() {
        return cy.get('#totalPrice');
    };

    esperaRecipt() {
        cy.get('[role="progressbar"]', {timeout:30000}).should('not.exist')
        cy.contains('Purchase has been completed successfully').should('have.text','Purchase has been completed successfully');
    }
};