import { html } from "htm/react";
import { useState } from "react";
import useUser from "../../../hooks/use-user";
import Confirm from "../../../components/Confirm";
import Alert from "../../../components/Alert";
import { IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import InsertChartIcon from "@mui/icons-material/InsertChart";

const FileItem = ({ file, hyperdrive, allowDeletion = false }) => {
  const user = useUser();
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");
  const [showDownloadMessage, setShowDownloadMessage] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const filename = file.key.split("/").pop();
  const fileExtension = filename.split(".").pop().toLowerCase();

  const styles = {
    card: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardInfo: {
      display: "flex",
      flexDirection: "row",
      gap: "12px",
      alignItems: "center",
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      color: "black",
      cursor: "pointer",
    },
    cardTitle: {
      margin: "0",
      color: "#333F4E",
      fontSize: "14px",
      fontWeight: 600,
    },
    cardDesc: {
      margin: "0",
      color: "#A3B2C7",
      fontSize: "14px",
      fontWeight: 600,
    },
  };

  async function download() {
    console.log(
      `[FileListItem] Downloading ${filename} to ${user.downloadsFolder}`
    );

    const ws = user.localdrive.createWriteStream(filename);
    const rs = hyperdrive.createReadStream(file.key, { timeout: 10000 });

    setShowSpinner(true);

    rs.pipe(ws);
    rs.on("end", () => {
      setShowSpinner(false);
      setDownloadMessage(
        `${filename} was downloaded to ${user.downloadsFolder}`
      );
      setShowDownloadMessage(true);
    });
    rs.on("error", (err) => {
      const hasTimedOut = err.message.includes("REQUEST_TIMEOUT");
      setErrorMessage(
        hasTimedOut
          ? `Could not start download of ${filename}. Maybe the network does not have the file.`
          : err.message
      );
      setShowErrorMessage(true);
      setShowSpinner(false);
    });
  }

  function getFileIcon(extension) {
    switch (extension) {
      case "pdf":
        return html`<${PictureAsPdfIcon} style=${{ color: "#FF7474" }} />`;
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
        return html`<${ImageIcon} style=${{ color: "#3FB67D" }} />`;
      case "mp4":
      case "avi":
      case "mov":
        return html`<${MovieIcon} style=${{ color: "#4A90E2" }} />`;
      case "pptx":
      case "xlsx":
      case "csv":
        return html`<${InsertChartIcon} style=${{ color: "#B576E9" }} />`;
      default:
        return html`<${InsertDriveFileIcon} style=${{ color: "#A3B2C7" }} />`;
    }
  }

  return html` <li style=${styles.card}>
    <div style=${styles.cardInfo}>
      <div
        style=${{
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ${getFileIcon(fileExtension)}
      </div>
      <div onClick=${download} style=${styles.textContainer}>
        <p style=${styles.cardTitle}>${filename}</p>

        <p style=${styles.cardDesc}>${file.date}</p>
      </div>
    </div>
    ${showSpinner && html` <${CircularProgress} size=${20} /> `}
    ${allowDeletion &&
    !showSpinner &&
    html`
        <${IconButton}
          size="small"
          onClick=${() => setShowDeletePrompt(true)}
          edge="end"
          aria-label="delete"
        >
          <${DeleteIcon} color="disabled" fontSize="small" />
        </${IconButton}>
      `}
    ${showDeletePrompt &&
    html`
      <${Confirm}
        title="Confirm"
        message=${`Are you sure you want to stop sharing ${filename}?`}
        onCancel=${() => setShowDeletePrompt(false)}
        onConfirm=${async () => {
          setShowDeletePrompt(false);
          setShowSpinner(true);
          await hyperdrive.del(file.key);
          setShowSpinner(false);
        }}
      />
    `}
    ${showErrorMessage &&
    html`
      <${Alert}
        title="Error"
        message=${errorMessage}
        onClose=${() => setShowErrorMessage(false)}
      />
    `}
    ${showDownloadMessage &&
    html`
      <${Alert}
        title="Downloaded"
        message=${downloadMessage}
        onClose=${() => setShowDownloadMessage(false)}
      />
    `}
  </li>`;
};

export default FileItem;
