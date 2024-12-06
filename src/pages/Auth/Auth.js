import { html } from "htm/react";
import AuthLayout from "./components/AuthLayout";
import AuthForm from "./components/AuthForm";
import { useState, useEffect } from "react";
import useUser from "../../hooks/use-user";
import usePeers from "../../hooks/use-peers";
import { Box, CircularProgress, Typography } from "@mui/material";

export default ({ app }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { loaded: arePeersLoaded } = usePeers();
  const { loaded: isUserLoaded } = useUser();

  useEffect(() => {
    console.log(
      "arePeersLoaded:",
      arePeersLoaded,
      "isUserLoaded:",
      isUserLoaded
    );
    if (arePeersLoaded && isUserLoaded) {
      setIsLoaded(true);
    }
  }, [arePeersLoaded, isUserLoaded]);

  if (!isLoaded) {
    return html`
      <${Box}
        sx=${{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <${CircularProgress} sx=${{ marginBottom: "20px" }} />
        <${Typography} variant="h3"> Loading <//>
      <//>
    `;
  }

  return html`
    <${AuthLayout}>
      <${AuthForm}> <//>
    <//>
  `;
};
