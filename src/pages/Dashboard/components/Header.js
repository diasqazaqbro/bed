import { html } from "htm/react";
import { Link } from "react-router-dom";

export default function Header() {
  const styles = {
    container: {
      display: "flex",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "32px 36px 0",
    },
    btn: {
      display: "flex",
      alignItems: "center",
      padding: "10px 18px",
      borderRadius: "30px",
      background: "#FA7275",
      color: "white",
      gap: "10px",
      transition: "background 0.3s, color 0.3s",
      boxShadow: "0px 8px 30px 0px #4159D64D",
      border: "none",
      fontWeight: 600,
      fontSize: 15,
    },
    btnContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      gap: "24px",
    },
  };

  return html`
    <header style=${styles.container}>
      <${Link} to="/" style=${styles.link}>
        <img src="public/assets/icons/logo-full-brand.svg" alt="Logo" />
      <//>
      <div style=${styles.btnContainer}>
        <button style=${styles.btn}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.6273 17.2771H11.3363V12.9412H12.7544C13.114 12.9412 13.3265 12.5325 13.114 12.2383L10.3555 8.42138C10.1798 8.17618 9.8161 8.17618 9.64037 8.42138L6.8819 12.2383C6.66939 12.5325 6.87781 12.9412 7.24152 12.9412H8.65958V17.2771H3.8537C1.70821 17.1586 0 15.1521 0 12.978C0 11.4782 0.813241 10.1705 2.0188 9.46347C1.90846 9.16515 1.85125 8.84639 1.85125 8.51129C1.85125 6.9788 3.0895 5.74055 4.62199 5.74055C4.953 5.74055 5.27176 5.79776 5.57009 5.9081C6.45689 4.02825 8.36943 2.72461 10.5926 2.72461C13.4696 2.7287 15.8398 4.93139 16.1095 7.73891C18.3204 8.11897 20 10.1664 20 12.4835C20 14.96 18.0711 17.1055 15.6273 17.2771Z"
              fill="white"
            />
          </svg>
          Upload
        </button>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.25 9V5.25C8.25 4.65326 8.48705 4.08097 8.90901 3.65901C9.33097 3.23705 9.90326 3 10.5 3H16.5C17.0967 3 17.669 3.23705 18.091 3.65901C18.5129 4.08097 18.75 4.65326 18.75 5.25V18.75C18.75 19.3467 18.5129 19.919 18.091 20.341C17.669 20.7629 17.0967 21 16.5 21H10.5C9.90326 21 9.33097 20.7629 8.90901 20.341C8.48705 19.919 8.25 19.3467 8.25 18.75V15M5.25 15L2.25 12M2.25 12L5.25 9M2.25 12H15"
            stroke="#FF7474"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </header>
  `;
}
