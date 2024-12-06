import { html } from "htm/react";
import { useState } from "react";
import useUser from "../hooks/use-user";
import styled from "styled-components";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Prompt from "../components/Prompt";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default () => {
  const user = useUser();
  const [showChangeName, setShowChangeName] = useState(false);

  return html`
    <${AppBar} position="static">
      <${Toolbar}>
        <${Box} sx=${{ flexGrow: 1, "-webkit-app-region": "drag" }}>
        <${Button} component="label" sx=${{ "-webkit-app-region": "no-drag" }}>
  Add files
  <${VisuallyHiddenInput}
    type="file"
    multiple
    onChange=${async (e) => {
      console.log("[AddFile] File input event:", e);

      if (!e.target.files.length) {
        console.warn("[AddFile] No files selected");
        return;
      }

      for (const file of e.target.files) {
        try {
          console.log(`[AddFile] Processing file: ${file.name}`);
          const data = await file.arrayBuffer();
          console.log(
            `[AddFile] File data ready: ${file.name}, size: ${file.size}`
          );

          await user.hyperdrive.put(`/files/${file.name}`, data);
          console.log(`[AddFile] File added: ${file.name}`);

          const metadata = {
            token: user.STATIC_TOKEN,
            name: file.name,
            size: file.size,
            uploadedAt: new Date().toISOString(),
          };

          await user.hyperdrive.put(
            `/files/${file.name}.meta`,
            Buffer.from(JSON.stringify(metadata))
          );
          console.log(`[AddFile] Metadata added for file: ${file.name}`);

          await user.getFilesByToken();
        } catch (error) {
          console.error(`[AddFile] Error adding file ${file.name}:`, error);
        }
      }
    }}
  />
</${Button}>
        </${Box}>
        <${Button}
          onClick=${() => setShowChangeName(true)}
          sx=${{ "-webkit-app-region": "no-drag" }}
        >
          ${user.profile.name}
          <${AccountCircleIcon} sx=${{ marginLeft: "10px" }} />
        </${Button}>
        ${
          showChangeName &&
          html`
            <${Prompt}
              title="Change name"
              label="Name"
              initialResponse=${user.profile.name}
              onCancel=${() => setShowChangeName(false)}
              onResponse=${async (newName) => {
                setShowChangeName(false);
                await user.updateProfile({ name: newName });
              }}
            />
          `
        }
      </${Toolbar}>
    </${AppBar}>
  `;
};
