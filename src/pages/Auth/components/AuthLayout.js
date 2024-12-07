import { html } from "htm/react";

export default function AuthLayout({ children }) {
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
    },
    sidebar: {
      display: "none",
      width: "50%",
      alignItems: "center",
      justifyContent: "center",
      background: "#FA7275",
      padding: "2rem",
    },
    sidebarContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "3rem",
      maxHeight: "800px",
      maxWidth: "430px",
      margin: "0 auto",
      color: "#fff",
      textAlign: "left",
    },
    sidebarHeading: {
      fontSize: "2rem",
      fontWeight: "bold",
      margin: "0 0 0.5rem 0",
    },
    sidebarParagraph: {
      fontSize: "1rem",
      lineHeight: "1.5",
      margin: "0",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: "3rem",
      justifyContent: "center",
    },
    logoMobileWrapper: {
      marginBottom: "4rem",
      display: "block",
    },
    logoImage: {
      height: "auto",
      width: "200px",
    },
    fileImage: {
      transition: "transform 0.3s",
    },
    fileImageHover: {
      transform: "rotate(2deg) scale(1.05)",
    },
  };

  return html`
    <div style=${styles.container}>
      <section
        style=${{
          ...styles.sidebar,
          display: "flex",
        }}
      >
        <div style=${styles.sidebarContent}>
          <div>
            <h1 style=${styles.sidebarHeading}>
              Manage your files the best way
            </h1>
            <p style=${styles.sidebarParagraph}>
              This is a place where you can store all your documents.
            </p>
          </div>
          <img
            src="public/assets/images/files.png"
            alt="Files"
            width="342"
            height="342"
            style=${styles.fileImage}
            onMouseOver=${(e) =>
              (e.currentTarget.style.transform = "rotate(2deg) scale(1.05)")}
            onMouseOut=${(e) => (e.currentTarget.style.transform = "none")}
          />
        </div>
      </section>

      <!-- Content Section -->
      <section style=${styles.mainContent}>
        <!-- Logo for mobile view -->

        ${children}
      </section>
    </div>
  `;
}
