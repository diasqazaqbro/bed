import { html } from "htm/react";
import { useState, useEffect } from "react";
import useUser from "../../hooks/use-user";
import usePeers from "../../hooks/use-peers";
import ControlPanel from "../../containers/ControlPanel";
import PeersPanel from "../../containers/PeersPanel";
import UserPanel from "../../containers/UserPanel";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";

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
    <${Grid} container spacing=${2}>
      <${Grid} item xs=${12}>
        <${ControlPanel} />
      <//>
      <${Grid} item xs=${6}>
        <${PeersPanel} />
      <//>
      <${Grid} item xs=${6}>
        <${UserPanel} />
      <//>
    <//>
  `;
};