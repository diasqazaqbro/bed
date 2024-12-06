import { html } from "htm/react";

export default function RecentFiles() {
  const styles = {
    container: {
      display: "flex",
      width: "50%",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      background: "white",
      padding: "0 20px",
    },
    title: {
      color: "#333F4E",
      fontSize: "24px",
      fontWeight: 700,
    },
  };

  return html`
    <article style=${styles.container}>
      <h2 style=${styles.title}>Recent files uploaded</h2>
    </article>
  `;
}
