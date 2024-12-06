import { html } from "htm/react";

import Header from "./Header";

export default function DashboardLayout({ children }) {
  const styles = {
    container: {
      display: "flex",
      background: "#FFFFFF",
      flexDirection: "column",
      height: "100vh",
    },
  };

  return html`
    <div style=${styles.container}>
      <${Header} />
      ${children}
    </div>
  `;
}
