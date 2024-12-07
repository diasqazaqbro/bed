import { html } from "htm/react";
import useUser from "../../../hooks/use-user";
import FileItem from "./FileItem";

export default function RecentFiles() {
  const styles = {
    container: {
      display: "flex",
      width: "50%",
      borderRadius: "20px",
      flexDirection: "column",
      background: "white",
      padding: "0 20px",
    },
    title: {
      color: "#333F4E",
      fontSize: "24px",
      fontWeight: 700,
      marginBottom: "18px",
    },
    circle: {
      height: "50px",
      width: "50px",
      borderRadius: "9999px",
      background: "#FF7474",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    cardList: {
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      padding: "0",
    },
    notFound: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
      color: '#333'
    },
  };

  const { hyperdrive, files } = useUser();

  console.log(files);
  
  return html`
    <article style=${styles.container}>
      <h2 style=${styles.title}>Recent files uploaded</h2>
      <ul style=${styles.cardList}>
        ${files.length < 0
          ? html`<div style=${styles.notFound}>Not found</div>`
          : files
              .sort((a, b) => a.key.localeCompare(b.key))
              .map(
                (file) => html`
                  <${FileItem}
                    key=${file.key}
                    file=${file}
                    hyperdrive=${hyperdrive}
                    allowDeletion
                  />
                `
              )}
      </ul>
    </article>
  `;
}
