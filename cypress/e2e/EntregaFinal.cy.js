/// <reference types="cypress" />
import { HomePage } from '../support/pages/homePage'
import { CheckoutPage } from '../support/pages/checkoutPage'
import { ProductsPage } from '../support/pages/productsPage'
import { ShoppingcartPage } from '../support/pages/shoppingcartPage'
import { ReciptPage } from '../support/pages/reciptPage'


describe('entrega final', () => {
  const username = 'mariano' + Math.floor(Math.random() * 1000);
  const password = '123456!'
  const gender = 'Male'
  const day = '30'
  const month = 'July'
  const year = '1984'
  const homePage = new HomePage();
  const checkoutPage = new CheckoutPage();
  const productsPage = new ProductsPage();
  const shoppingcartPage = new ShoppingcartPage();
  const reciptPage = new ReciptPage();
  let datos, datosTarjeta, suma;

  before('login y datos', () => {
    cy.fixture('tarjeta').then(data => (
      datosTarjeta = data
    )),
    cy.fixture('product').then(data => (
      datos = data
    )),
    cy.request({
      method: 'POST',
      url: 'https://pushing-it.onrender.com/api/register',
      body: {
          username: username,
          password: password,
          gender: gender,
          day:day,
          month: month,
          year: year
        },

      }).then(respuesta =>{
        cy.log(respuesta.body)
        expect(respuesta.status).is.equal(200)
        expect(respuesta.body.newUser.username).is.equal(username)
      })
        .then(() => {
          cy.request({
            method: "POST",
            url: "https://pushing-it.onrender.com/api/login",
            body: {
              username: username,
              password: "123456!",
            }
          })
            .then(respuesta => {
              window.localStorage.setItem('token', respuesta.body.token)
              window.localStorage.setItem('user', respuesta.body.username)
            })
        })

  })


  it('entrega final', () => {
    cy.visit('')
    homePage.clickOnlineshoplink();
    productsPage.agregarproducto(datos.producto1.name);
    productsPage.agregarproducto(datos.producto2.name);
    productsPage.goShoppingCartButton();
    shoppingcartPage.VerificoProductos(datos.producto1.name).should('have.text', datos.producto1.name);
    shoppingcartPage.VerificoProductos(datos.producto2.name).should('have.text', datos.producto2.name);
    shoppingcartPage.VerificoPrecios(datos.producto1.name).should('have.text', `$${datos.producto1.price}`);
    shoppingcartPage.VerificoPrecios(datos.producto2.name).should('have.text', `$${datos.producto2.price}`);
    shoppingcartPage.clickShowTotalPrice();
    suma=datos.producto1.price+datos.producto2.price;
    shoppingcartPage.ValorSumaProductos().should('text', suma);
    shoppingcartPage.clickCheckoutButton();
    checkoutPage.escribirNombre(datosTarjeta.tarjeta.name);
    checkoutPage.escribirApellido(datosTarjeta.tarjeta.lastname);
    checkoutPage.escribirNumeroTarjeta(datosTarjeta.tarjeta.tarjetaDeCredito);
    checkoutPage.clickPurchaseButton();
    reciptPage.esperaRecipt();
    reciptPage.verificoNombre(datos.checkout.nombre).contains(datos.checkout.nombre);
    reciptPage.verificoNombre(datos.checkout.apellido).contains(datos.checkout.apellido);
    reciptPage.verificoProductos(datos.producto1.name).should('have.text', datos.producto1.name);
    reciptPage.verificoProductos(datos.producto2.name).should('have.text', datos.producto2.name);
    reciptPage.verificoTarjeta(datos.checkout.numeroTarjeta).should('have.text',datos.checkout.numeroTarjeta);
    reciptPage.verificoTotal(suma).contains(suma);

    

  });
  after("elimina usuario", () =>{

    cy.request({
      url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
      method: "DELETE"
  }).then(response => {
      expect(response.status).is.equal(200);
  });

})

})
