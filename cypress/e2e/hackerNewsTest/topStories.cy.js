describe('topStories', () => {
  it('passes', () => {
    cy.request('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array').and.have.length.above(0);
    })
  })
})