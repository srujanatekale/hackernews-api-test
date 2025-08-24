import {testArrayHasValidNumbers} from '../../support/e2e.js'
describe('Items', () => {
  beforeEach(function() {
    cy.request('GET', 'https://hacker-news.firebaseio.com/v0/topstories.json').then((response) => { 
        cy.wrap(response.body).as('topStoryIds');
    })

    cy.fixture('itemsSchema.json').then((schema) => {
        cy.wrap(schema).as('itemsSchema');
    })
    cy.fixture('itemCommentsSchema.json').then((schema) => {
        cy.wrap(schema).as('itemCommentsSchema');
    })
  })


  it('should return valid story for given id', function() { 
    this.topStoryIds.forEach(topStoryId =>  {
        cy.request('GET', `https://hacker-news.firebaseio.com/v0/item/${topStoryId}.json`).validateSchema (this.itemsSchema).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', topStoryId);
            expect(response.body).to.have.property('type', 'story');
        })
    })

  })

  it('should return valid comment for given id', function() {
    this.topStoryIds.forEach(topStoryId =>  { 
        cy.request('GET', `https://hacker-news.firebaseio.com/v0/item/${topStoryId}.json`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', topStoryId);
            expect(response.body).to.have.property('type', 'story');
            if (response.body.kids && response.body.kids.length > 0) {
                response.body.kids.forEach(commentId => {
                    cy.request('GET', `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`).validateSchema (this.itemCommentsSchema).then((commentResponse) => {
                        expect(commentResponse.status).to.eq(200);
                        expect(commentResponse.body).to.have.property('id', commentId);
                        expect(commentResponse.body).to.have.property('type', 'comment');
                    })
                })
            } else {
                this.skip(); // Skip the test if there are no comments
            }
        })
    })
})

  it('should return nil for non-existing item', function() { 
    const nonExistingId = 9999999999; // Assuming this ID does not exist
    cy.request({
        method: 'GET',
        url: `https://hacker-news.firebaseio.com/v0/item/${nonExistingId}.json`,
        failOnStatusCode: false // Prevent Cypress from failing the test on non-2xx status codes
    }).then((response) => {
        expect(response.status).to.eq(200); // The API returns 200 with null body for non-existing items
        expect(response.body).to.be.null;
    })
  })
})
