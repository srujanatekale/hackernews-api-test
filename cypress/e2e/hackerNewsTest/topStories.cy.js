describe('topStories', () => {
  beforeEach(() => {
    cy.fixture('topStoriesSchema.json').as('schema');
  });

  it('gets json array with valid ids', function() {
    cy.request('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json').validateSchema(this.schema).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array').and.have.length.above(0);
    })
  })
})