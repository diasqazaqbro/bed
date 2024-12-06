import { html } from "htm/react";

export default function Stats() {
  const styles = {
    container: {
      display: "flex",
      width: "50%",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "row",
      gap: "30px",
      padding: "30px",
      background: "white",
      height: "100%",
    },
  };

  return html` <article style=${styles.container}></article> `;
}
