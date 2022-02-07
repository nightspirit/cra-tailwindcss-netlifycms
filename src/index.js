import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import netlifyIdentity from "netlify-identity-widget";
import "index.css";

netlifyIdentity.init();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

