import { html } from "htm/react";

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
      marginBottom: "28px",
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

  const filesList = [
    { name: "CVdesigner.docx", date: "4:57am, 10 Nov" },
    { name: "ProjectProposal.pdf", date: "3:30pm, 9 Nov" },
    { name: "MeetingNotes.txt", date: "12:00pm, 8 Nov" },
    { name: "Invoice_123.xlsx", date: "11:15am, 7 Nov" },
  ];

  return html`
    <article style=${styles.container}>
      <h2 style=${styles.title}>Recent files uploaded</h2>
      <ul style=${styles.cardList}>
        ${filesList.map(
          (file) => html`
            <li style=${styles.card} key=${file.name}>
              <div style=${styles.cardInfo}>
                <div style=${styles.circle}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M33.4629 9.72048C33.6669 10.041 33.3175 10.4144 32.9471 10.3302V10.3302C32.2225 10.1144 31.4208 10.0065 30.6037 10.0065H25.3805C25.2233 10.0065 25.0752 9.93254 24.9808 9.80685L23.1266 7.3394V7.3394C22.9095 7.03175 23.1147 6.58398 23.4913 6.58398H27.7362C30.1428 6.58398 32.2626 7.83386 33.4629 9.72048Z"
                      fill="white"
                    />
                    <path
                      d="M34.5498 13.5832C33.8869 13.1052 33.1315 12.7507 32.3144 12.5502C31.7594 12.3961 31.189 12.319 30.6032 12.319H24.8682C23.974 12.319 23.9123 12.2419 23.4344 11.6098L21.2761 8.74232C20.274 7.40107 19.4877 6.58398 16.9748 6.58398H13.3982C9.63648 6.58398 6.58398 9.63648 6.58398 13.3982V30.6032C6.58398 34.3648 9.63648 37.4173 13.3982 37.4173H30.6032C34.3648 37.4173 37.4173 34.3648 37.4173 30.6032V19.1332C37.4173 16.8361 36.2919 14.8165 34.5498 13.5832ZM25.6852 28.6915H18.3007C17.6994 28.6915 17.2369 28.2136 17.2369 27.6123C17.2369 27.0265 17.6994 26.5332 18.3007 26.5332H25.6852C26.2865 26.5332 26.7644 27.0265 26.7644 27.6123C26.7644 28.2136 26.2865 28.6915 25.6852 28.6915Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div style=${styles.textContainer}>
                  <p style=${styles.cardTitle}>${file.name}</p>
                  <p style=${styles.cardDesc}>${file.date}</p>
                </div>
              </div>
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.166 26.9167C14.166 28.475 15.441 29.75 16.9993 29.75C18.5577 29.75 19.8327 28.475 19.8327 26.9167C19.8327 25.3583 18.5577 24.0833 16.9993 24.0833C15.441 24.0833 14.166 25.3583 14.166 26.9167Z"
                  stroke="#A3B2C7"
                  stroke-width="1.50667"
                />
                <path
                  d="M14.166 7.08268C14.166 8.64102 15.441 9.91602 16.9993 9.91602C18.5577 9.91602 19.8327 8.64102 19.8327 7.08268C19.8327 5.52435 18.5577 4.24935 16.9993 4.24935C15.441 4.24935 14.166 5.52435 14.166 7.08268Z"
                  stroke="#A3B2C7"
                  stroke-width="1.50667"
                />
                <path
                  d="M14.166 17.0007C14.166 18.559 15.441 19.834 16.9993 19.834C18.5577 19.834 19.8327 18.559 19.8327 17.0007C19.8327 15.4423 18.5577 14.1673 16.9993 14.1673C15.441 14.1673 14.166 15.4423 14.166 17.0007Z"
                  stroke="#A3B2C7"
                  stroke-width="1.50667"
                />
              </svg>
            </li>
          `
        )}
      </ul>
    </article>
  `;
}
