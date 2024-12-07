/* global Pear */

import { html } from "htm/react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./src/context/user";
import { PeersProvider } from "./src/context/peers";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import Auth from "./src/pages/Auth/Auth";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import useUser from "./src/hooks/use-user";

const { app } = await Pear.versions();
const theme = createTheme({
  palette: {
    mode: "light",
  },
});
Pear.updates(() => Pear.reload());

const AuthRedirect = () => {
  const { profile } = useUser();
  return profile.token
    ? html`<${Navigate} to="/dashboard" replace />`
    : html`<${Auth} />`;
};

const root = createRoot(document.querySelector("#root"));
root.render(html`
  <${ThemeProvider} theme=${theme}>
    <${CssBaseline} />
    <${UserProvider} config=${Pear.config}>
      <${PeersProvider}
        name="filesharing-app-example"
        topic=${
          app.key ||
          "57337a386673415371314f315a6d386f504576774259624e32446a7377393752"
        }
      >
       <${HashRouter}>
          <${Routes}>
            <${Route} path="/" element=${html`<${AuthRedirect} />`} />
            <${Route} path="/dashboard" element=${html`<${Dashboard} />`} />
            <${Route}
              path="*"
              element=${html`<div>Page not found</div>`}
            />
          </${Routes}>
        </${HashRouter}>
      </${PeersProvider}>
    </${UserProvider}>
  </${ThemeProvider}>
`);
