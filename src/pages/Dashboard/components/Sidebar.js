import { html } from "htm/react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navsList = [
    // {
    //   title: "Dashboard",
    //   path: "/",
    //   icon: "public/assets/icons/dashboard.svg",
    // },
    // {
    //   title: "Documents",
    //   path: "/documents",
    //   icon: "public/assets/icons/documents.svg",
    // },
    // {
    //   title: "Images",
    //   path: "/images",
    //   icon: "public/assets/icons/images.svg",
    // },
    // {
    //   title: "Media",
    //   path: "/media",
    //   icon: "public/assets/icons/video.svg",
    // },
    // {
    //   title: "Others",
    //   path: "/others",
    //   icon: "public/assets/icons/others.svg",
    // },
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "#FFFFFF",
      padding: "32px 36px 40px",
    },
    link: {
      textDecoration: "none",
      marginBottom: "32px",
    },
    navList: {
      marginTop: "40px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    navItem: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      borderRadius: "30px",
      color: "#333F4E",
      padding: "17px 30px",
      textDecoration: "none",
      gap: "10px",
      transition: "background 0.3s, color 0.3s",
      fontWeight: "600",
      fontSize: "16px",
    },
    navItemActive: {
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      padding: "17px 30px",
      borderRadius: "30px",
      background: "#FA7275",
      color: "white",
      gap: "10px",
      transition: "background 0.3s, color 0.3s",
      boxShadow: "0px 8px 30px 0px #4159D64D",
      fontWeight: "600",
      fontSize: "16px",
    },
    icon: {
      width: "26px",
      height: "26px",
      color: "#333F4E",
    },
  };

  return html`
    <aside style=${styles.container}>
      <${Link} to="/" style=${styles.link}>
        <img src="public/assets/icons/logo-full-brand.svg" alt="Logo" />
      <//>
      <nav style=${styles.navList}>
        ${navsList.map(
          (item, index) => html`
            <${Link}
              key=${index}
              to=${item.path}
              style=${location.pathname === item.path
                ? styles.navItemActive
                : styles.navItem}
            >
              <img src=${item.icon} alt=${item.title} style=${styles.icon} />
              ${item.title}
            <//>
          `
        )}
      </nav>
    </aside>
  `;
}
