/// <reference types="cypress" />
import { HomePage } from '../support/pages/homePage'
import { CheckoutPage } from '../support/pages/checkoutPage'
import { ProductsPage } from '../support/pages/productsPage'
import { ShoppingcartPage } from '../support/pages/shoppingcartPage'
import { ReciptPage } from '../support/pages/reciptPage'


describe('entrega final', () => {
  let product;
  const username = 'mariano' + Math.floor(Math.random() * 1000);
  const homePage = new HomePage();
  const checkoutPage = new CheckoutPage();
  const productsPage = new ProductsPage();
  const shoppingcartPage = new ShoppingcartPage();
  const reciptPage = new ReciptPage();


  before('login y datos', () => {
    cy.request({
      url: "https://pushing-it.onrender.com/api/register",
      method: "POST",
      Body: {
        username: usuario,
        password: "123456!",
        gender: "male",
        day: "30",
        month: "07",
        year: "1984",
      },

    })
      .then(() => {
        cy.request({
          url: "https://pushing-it.onrender.com/api/login",
          method: "POST",
          Body: {
            username: usuario,
            password: "123456!",
          }
        })
          .then(respuesta => {
            window.localStorage.setItem('token', respuesta.body.token)
            window.localStorage.setItem('user', respuesta.body.username)
          })
      }),
      cy.fixture('product').then(product => (
        datos = product

      )),

      it('entrega final', () => {
        cy.visit('')
        homePage.clickOnlineshoplink();
        productsPage.agregarproducto(product.producto1.name);
        productsPage.agregarproducto(product.producto2.name);
        productsPage.gotoShoppingCartButton(); shoppingcartPage.VerificoProductos(product.producto1.name).should('have.text', product.producto1.name);
        shoppingcartPage.VerificoProductos(product.producto2.name).should('have.text', product.producto2.name);
        shoppingcartPage.VerificoPrecios(product.producto1.name).should('have.text', `$${product.producto1.price}`);
        shoppingcartPage.VerificoPrecios(product.producto2.name).should('have.text', `$${product.producto2.price}`);
        shoppingcartPage.clickShowTotalPrice();
        shoppingcartPage.ValorSumaProductos(product.producto1.price + product.producto2.price).should('have.text', suma);
        shoppingcartPage.clickCheckoutButton();
        checkoutPage.escribirNombre(datos.checkout.nombre);
        checkoutPage.escribirApellido(datos.checkout.apellido);
        checkoutPage.escribirNumeroTarjeta(datos.checkout.numeroTarjeta);
        checkoutPage.clickPurchaseButton();
        reciptPage.espera(datos.check.nombre, datos.checkout.apellido);
        reciptPage.VerificoProductos(product.producto1.name);
        reciptPage.VerificoProductos(product.producto2.name);
        reciptPage.verificoTarjeta(dats.checkout.numeroTarjeta);
        reciptPage.verificoTotal(suma);

      });
    after("eliminar usuario", () => {
      cy.request({
        url: `https://pushing-it.onrender.com/api/deleteuser/mariano${username}`,
        method: "DELETE",
      }).then((respuesta) => {
        expect(respuesta.status).is.equal(200);
      });

    })
  })

})