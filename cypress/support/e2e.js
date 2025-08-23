// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-schema-validator';

export function testArrayHasValidNumbers(jsonArray) {
    jsonArray.forEach(item => {
         // Assert that each item is a number and not NaN
          if (typeof item !== 'number' || Number.isNaN(item)) {
            return false;
          }
          
    });
    return true;
}