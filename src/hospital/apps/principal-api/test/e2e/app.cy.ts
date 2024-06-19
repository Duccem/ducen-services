/// <reference types="cypress" />
describe('GET /api', () => {
  it('hello world', () => {
    cy.request('GET', '/api/health').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('status', 'ok');
    });
  });
});
