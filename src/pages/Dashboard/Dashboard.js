import { html } from "htm/react";
import { useState, useEffect } from "react";
import useUser from "../../hooks/use-user";
import usePeers from "../../hooks/use-peers";
import DashboardLayout from "./components/DasboardLayout";
import MainContent from "./components/MainContent";

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

  return html` <${DashboardLayout}> <${MainContent}><//> <//> `;
};
