/// <reference types="cypress" />
import React from 'react';
// import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'; // Ensure ApolloClient is imported
// import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter for routing context
import Header from '../../client/src/components/Header';

// // Set up a simple Apollo Client with an in-memory cache for the test
// const client = new ApolloClient({
//   uri: '/graphql',  // This is fine for mock; no actual API call will be made
//   cache: new InMemoryCache(),
// });

describe('Login Component', () => {
//   beforeEach(() => {
//     // Mount the Login component wrapped inside ApolloProvider and Router
//     cy.mount(
//     //   <ApolloProvider client={client}>
//         // <Router>
//           <Login />
//         // </Router>
//     //   </ApolloProvider>
//     );
//   });

//   it('renders the login form correctly', () => {
//     cy.get('[data-cy=email-input]').should('exist');
//     cy.get('[data-cy=password-input]').should('exist');
//     cy.get('[data-cy=login-button]').should('exist');
//   });

//   it('shows error when invalid login credentials are submitted', () => {
//     cy.get('[data-cy=email-input]').type('invalid@example.com');
//     cy.get('[data-cy=password-input]').type('wrongpassword');
//     cy.get('[data-cy=login-button]').click();

//     cy.get('[data-cy=error-message]').should('be.visible').and('contain', 'Invalid email or password.');
//   });

//   it('redirects to landing page on successful login', () => {
//     cy.intercept('POST', '/graphql', {
//       statusCode: 200,
//       body: {
//         data: {
//           login: { token: 'valid-token' },
//         },
//       },
//     }).as('loginRequest');

//     // cy.get('[data-cy=email-input]').type('valid@example.com');
//     // cy.get('[data-cy=password-input]').type('correctpassword');
//     // cy.get('[data-cy=login-button]').click();

//     cy.wait('@loginRequest');
//     cy.location('pathname').should('eq', '/landing');
//   });

  it('navigates to Header', () => { 
    cy.mount(<Header/>)
    // cy.get('.signupLink a').click();
    // cy.location('pathname').should('eq', '/signup');
  });
});


