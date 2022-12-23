export class ReciptPage {
    constructor() {
        this.thankyouButton = 'Thank you';
    };

    clickOnThankYouButton() {
        cy.contains(this.thankyouButton).click();
    };

};