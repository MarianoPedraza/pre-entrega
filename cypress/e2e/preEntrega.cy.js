/// <reference types="cypress" />
import { RegisterPage } from '../support/pages/registerPage'
import { LoginPage } from '../support/pages/loginPage'
import { HomePage } from '../support/pages/homePage'
import { ProductsPage } from '../support/pages/productsPage'
import { ShoppingcartPage } from '../support/pages/ShoppingcartPage'


describe('pre entrega', () => {
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const shoppingcartPage = new ShoppingcartPage();
  let login
  let product

  before('Before', () => {
    cy.fixture("login").then(data => {
      login = data
    });
    cy.fixture("product").then(data => {
      product = data
    });


  });

  it('pre entrega ', () => {
    cy.visit('')
    registerPage.dobleClickRegister();
    loginPage.escribirUsuario(login.usuario);
    loginPage.escribirContraseña(login.contraseña);
    loginPage.clickLoginButton();
    homePage.clickOnlineshoplink();
    productsPage.agregarproducto(product.producto1.name);
    productsPage.agregarproducto(product.producto2.name);
    productsPage.gotoShoppingCartButton();
    shoppingcartPage.VerificoProductos(product.producto1.name).should('have.text',product.producto1.name);
    shoppingcartPage.VerificoProductos(product.producto2.name).should('have.text',product.producto2.name);
    shoppingcartPage.VerificoPrecios(product.producto1.name).should('have.text',`$${product.producto1.price}`);
    shoppingcartPage.VerificoPrecios(product.producto2.name).should('have.text',`$${product.producto2.price}`);
    shoppingcartPage.clickShowTotalPrice();
    shoppingcartPage.ValorSumaProductos(product.producto1.price + product.producto2.price).should('have.text','35')

  });
});


