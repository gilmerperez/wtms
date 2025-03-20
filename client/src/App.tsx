// import "./App.css";
// import "./styles/pages.css";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from "@apollo/client";
// import AuthService from "./utils/auth";
// import { Outlet } from "react-router-dom";
// import { setContext } from "@apollo/client/link/context";
// import NavigationBar from "./components/NavigationBar.tsx";
// import Header from "./components/Header.tsx";
// import Footer from "./components/Footer.tsx";

// // Construct our main GraphQL API endpoint
// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// // Construct request middleware that will attach the JWT token to every request as an `authorization` header
// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("id_token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// function App() {
//   const isLoggedIn = AuthService.loggedIn();

//   return (
//     <ApolloProvider client={client}>
      
//       <div className="d-flex flex-column min-vh-100">
//       <Header></Header>
//         {/* Only show NavigationBar if user is logged in */}
//         {isLoggedIn && <NavigationBar />}
        
//         <main className="flex-grow-1 mx bg-secondary text-black py-3">
//           <Outlet />
//         </main>
//         <Footer></Footer>
//       </div>
//     </ApolloProvider>
//   );
// }

// export default App;


import "./App.css";
import "./styles/pages.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import AuthService from "./utils/auth";
import { Outlet } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import NavigationBar from "./components/NavigationBar.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const isLoggedIn = AuthService.loggedIn();

  return (
    <ApolloProvider client={client}>
      <div className="d-flex flex-column min-vh-100">
        {/* Header at the top */}
        <Header />

        {/* Show NavigationBar only if the user is logged in */}
        {isLoggedIn && <NavigationBar />}

        {/* Main content area that will be stretched */}
        <main className="d-flex flex-column justify-content-center align-items-center flex-grow-1 bg-secondary text-black py-3">
          <div className="container">
            <Outlet />
          </div>
        </main>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
