import { html } from "htm/react";
import { useState, useEffect } from "react";
import useUser from "../../hooks/use-user";
import usePeers from "../../hooks/use-peers";
import DashboardLayout from "./components/DasboardLayout";
import MainContent from "./components/MainContent";
import { Box } from "@mui/material";

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
        <div class="loader-container">
          <div class="loader2"></div>
        </div>
      <//>
    `;
  }

  return html` <${DashboardLayout}> <${MainContent}><//> <//> `;
};
