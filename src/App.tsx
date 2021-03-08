import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import ProductPage from "./pages/ProductPage";

function App() {
  const client: any = new ApolloClient({
    uri: "https://pangaea-interviews.now.sh/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ProductPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
