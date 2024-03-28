/// <reference types="cypress" />
describe('Ducen', function () {
  it('Auth page', function () {
    cy.visit('/auth/login');
    cy.contains('Helsa');
  });
});
