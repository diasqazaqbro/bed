import { html } from "htm/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      console.log("Submitted Values:", values);
      reset();
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      color: "#333",
      fontFamily: "sans-serif",
    },
    sidebar: {
      display: "none",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to bottom right, #56B8FF, #3DD9B3)",
      color: "#fff",
      width: "40%",
      padding: "2rem",
      textAlign: "center",
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      backgroundColor: "#fff",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#f2f5f9",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0px 10px 30px rgba(66, 71, 97, 0.1)",
    },
    input: {
      width: "100%",
      padding: "0.8rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    button: {
      padding: "0.8rem",
      borderRadius: "5px",
      backgroundColor: "#0085FF",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    error: {
      color: "red",
    },
  };

  return html`
    <section style=${styles.content}>
      <form style=${styles.form} onSubmit=${handleSubmit(onSubmit)}>
        <label for="fullName">Full Name:</label>
        <input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          style=${styles.input}
          ...${register("fullName")}
        />

        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          style=${styles.input}
          ...${register("email")}
        />

        <button type="submit" style=${styles.button}>
          ${isLoading ? "Submitting..." : "Submit"}
        </button>

        ${errorMessage
          ? html`<p style=${styles.error}>${errorMessage}</p>`
          : ""}
      </form>
    </section>
  `;
};
