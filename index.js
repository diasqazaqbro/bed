/* global Pear */

import { html } from "htm/react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./src/context/user";
import { PeersProvider } from "./src/context/peers";
import Auth from "./src/pages/Auth/Auth";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const { app } = await Pear.versions();
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
Pear.updates(() => Pear.reload());

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
            <${Route} path="/" element=${html`<${Auth} />`} />
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
