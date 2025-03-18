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
      <div className="flex-column justify-flex-start min-100-vh">
        {/* Only show NavigationBar if user is logged in */}
        {isLoggedIn && <NavigationBar />}
        <div className="container">
          <Outlet />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
