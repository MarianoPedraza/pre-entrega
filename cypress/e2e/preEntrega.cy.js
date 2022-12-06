describe('pre entrega', () => {

  let login;
  let products;

  before('Before', () => {

    cy.fixture("login").then(data => {
      login = data
    });
    cy.fixture("products").then(data => {
      products = data
    });
  });
  it('Deberia ingresqr al sistema con datos validos', () => {

    cy.log(fixture);
    cy.contains('log in').click();
    cy.get('#onlineshoplink').click();
    cy.get('#blacktshirt').clck().type('{enter}');
    cy.get('#whitepants').clck().type('{enter}');
    cy.get('#goShoppingCart').click();
    cy.contains('White Pants').should('exist')
    cy.contains('Black T-Shirt').should('exist')

  })


})


