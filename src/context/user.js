/* global Pear */

import { createContext, useEffect, useRef, useState } from "react";
import { html } from "htm/react";
import Corestore from "corestore";
import Hyperdrive from "hyperdrive";
import Localdrive from "localdrive";
import downloadsFolder from "downloads-folder";

const UserContext = createContext();

function UserProvider({ config, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState({});
  const [files, setFiles] = useState([]);
  const corestoreRef = useRef(new Corestore(config.storage));
  const hyperdriveRef = useRef(new Hyperdrive(corestoreRef.current));
  const localdriveRef = useRef(new Localdrive(downloadsFolder()));

  Pear.teardown(async () => {
    await corestoreRef.current.close();
  });

  useEffect(() => {
    hyperdriveRef.current
      .ready()
      .then(initProfile)
      .then(getProfile)
      .then(getFilesByToken)
      .then(() => setLoaded(true));
  }, [hyperdriveRef]);

  async function initProfile() {
    const exists = await hyperdriveRef.current.exists("/meta/profile.json");
    if (exists) return;
    await updateProfile({ name: "No name" });
  }

  async function updateProfile(profile) {
    await hyperdriveRef.current.put(
      "/meta/profile.json",
      Buffer.from(JSON.stringify(profile))
    );
  }

  async function getProfile() {
    const buf = await hyperdriveRef.current.get("/meta/profile.json");
    setProfile(JSON.parse(buf));
  }

  async function getFilesByToken() {
    const newFiles = [];
    const stream = hyperdriveRef.current.list("/files", { recursive: false });

    for await (const file of stream) {
      if (!file.key || file.key.endsWith(".meta")) {
        continue;
      }

      try {
        const metadataBuffer = await hyperdriveRef.current.get(
          `${file.key}.meta`
        );
        const metadata = JSON.parse(new TextDecoder().decode(metadataBuffer));
        const buf = await hyperdriveRef.current.get("/meta/profile.json");

        if (metadata.token === JSON.parse(buf).token) {
          newFiles.push({ ...file, token: metadata.token });
        }
      } catch (err) {
        console.warn(
          `[UserProvider] Metadata not found for file: ${file.key}`,
          err
        );
      }
    }

    setFiles(newFiles);
  }

  async function saveFileWithToken(file) {
    const filePath = `/files/${file.name}`;
    const metaPath = `${filePath}.meta`;

    const data = await file.arrayBuffer();
    await hyperdriveRef.current.put(filePath, data);
    console.log(profile.token);

    const metadata = {
      token: profile.token || "",
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    };

    await hyperdriveRef.current.put(
      metaPath,
      Buffer.from(JSON.stringify(metadata))
    );

    console.log(`[UserProvider] File and metadata saved: ${file.name}`);
    await getFilesByToken(); // Обновляем список файлов
  }

  useEffect(() => {
    const profileWatcher = hyperdriveRef.current.watch("/meta", {
      recursive: false,
    });

    watchForever();
    async function watchForever() {
      for await (const _ of profileWatcher) {
        // eslint-disable-line no-unused-vars
        await getProfile();
      }
    }

    return async () => {
      await profileWatcher.destroy();
    };
  }, [hyperdriveRef.current]);

  useEffect(() => {
    const filesWatcher = hyperdriveRef.current.watch("/files");

    watchForever();
    async function watchForever() {
      for await (const _ of filesWatcher) {
        // eslint-disable-line no-unused-vars
        await getFilesByToken();
      }
    }

    return async () => {
      await filesWatcher.destroy();
    };
  }, [hyperdriveRef.current]);

  return html`
    <${UserContext.Provider}
      value=${{
        loaded,
        profile,
        updateProfile,
        files,
        saveFileWithToken,
        getFilesByToken,
        corestore: corestoreRef.current,
        hyperdrive: hyperdriveRef.current,
        localdrive: localdriveRef.current,
        downloadsFolder: downloadsFolder(),
      }}
      ...${props}
    />
  `;
}

export { UserContext, UserProvider };
