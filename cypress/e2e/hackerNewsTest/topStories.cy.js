import {testArrayHasValidNumbers} from '../../support/e2e.js'
describe('topStories', () => {
  it('gets json array with valid ids', () => {
    cy.request('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array').and.have.length.above(0);
        cy.wrap(testArrayHasValidNumbers(response.body)).then((result) => {
            expect(result).to.be.true;
        });
    })
  })
})