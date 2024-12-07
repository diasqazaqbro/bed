import { html } from "htm/react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import PieChartIcon from "@mui/icons-material/PieChart";
import useUser from "../../../hooks/use-user";

export default function Stats() {
  const styles = {
    container: {
      display: "flex",
      gap: "30px",
      padding: "30px",
      background: "#F7F9FC",
      borderRadius: "20px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
      borderRadius: "20px",
      background: "white",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      width: "180px",
      height: "190px",
      textAlign: "center",
    },
    iconWrapper: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    iconText: {
      margin: "0",
      fontSize: "14px",
      fontWeight: 600,
      color: "#333F4E",
    },
    smallText: {
      margin: "5px 0",
      fontSize: "12px",
      fontWeight: 400,
      color: "#A3B2C7",
    },
  };
  const { files } = useUser();

  const groupFilesByType = (files) => {
    const fileTypes = {
      Documents: {
        icon: html`<${InsertDriveFileIcon} style=${{ color: "white" }} />`,
        background: "#FF7474",
        extensions: ["docx", "pdf", "txt"],
        files: [],
      },
      Images: {
        icon: html`<${ImageIcon} style=${{ color: "white" }} />`,
        background: "#4A90E2",
        extensions: ["jpg", "jpeg", "png", "gif"],
        files: [],
      },
      "Video, Audio": {
        icon: html`<${MovieIcon} style=${{ color: "white" }} />`,
        background: "#3FB67D",
        extensions: ["mp4", "avi", "mov", "mp3"],
        files: [],
      },
      Others: {
        icon: html`<${PieChartIcon} style=${{ color: "white" }} />`,
        background: "#B576E9",
        extensions: [],
        files: [],
      },
    };

    files?.forEach((file) => {
      const extension = file.key.split(".").pop().toLowerCase();
      let typeFound = false;

      for (const [type, group] of Object.entries(fileTypes)) {
        if (group.extensions.includes(extension)) {
          group.files.push(file);
          typeFound = true;
          break;
        }
      }

      if (!typeFound) {
        fileTypes["Others"].files.push(file);
      }
    });

    return fileTypes;
  };

  const calculateStats = (files) => {
    const totalSize = files.reduce(
      (sum, file) => sum + file.value.blob.byteLength,
      0
    );
    const lastUpdate = files
      .map((file) => new Date(file.seq)) // Симуляция времени обновления
      .sort((a, b) => b - a)[0];

    return {
      size: (totalSize / (1024 * 1024)).toFixed(2) + " MB",
      lastUpdate: lastUpdate
        ? lastUpdate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }) +
          ", " +
          lastUpdate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
          })
        : "never",
    };
  };

  const fileTypes = groupFilesByType(files);
  const stats = Object.entries(fileTypes).map(([type, group]) => {
    const { size, lastUpdate } = calculateStats(group.files);

    return {
      icon: group.icon,
      background: group.background,
      title: type,
      size,
      lastUpdate,
    };
  });

  return html`
    <section style=${styles.container}>
      ${stats.map(
        (stat) => html`
          <div style=${styles.card}>
            <div
              style=${{
                ...styles.iconWrapper,
                background: stat.background,
              }}
            >
              ${stat.icon}
            </div>
            <p style=${styles.iconText}>${stat.title}</p>
            <p style=${styles.iconText}>${stat.size}</p>
            <p style=${styles.smallText}>Last update</p>
            <p style=${styles.smallText}>${stat.lastUpdate}</p>
          </div>
        `
      )}
    </section>
  `;
}
