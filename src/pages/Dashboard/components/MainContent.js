import { html } from "htm/react";
import RecentFiles from "./RecentFiles";
import Stats from "./Stats";

export default function MainContent() {
  const styles = {
    container: {
      display: "flex",
      background: "#F2F4F8",
      borderRadius: "30px",
      display: "flex",
      flexDirection: "row",
      gap: "30px",
      padding: "30px",
      margin: "20px",
      height: "70vh",
    },
  };

  return html`
    <main style=${styles.container}>
      <${Stats} />
      <${RecentFiles} />
    </main>
  `;
}
