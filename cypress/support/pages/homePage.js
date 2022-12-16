export class HomePage {
    constructor() {
        this.Onlineshoplink = '#onlineshoplink';
    }

    clickOnlineshoplink() {
        cy.get(this.Onlineshoplink).click();
    };

};