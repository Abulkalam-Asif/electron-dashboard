import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { HashRouter as Router } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import AlertContainer from "./components/general/alertContainer/AlertContainer";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <AlertProvider>
      <Router>
        <App />
      </Router>
      <AlertContainer />
    </AlertProvider>
  </ApolloProvider>
);
