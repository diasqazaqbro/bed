import { html } from "htm/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import useUser from "../../../hooks/use-user";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isFinish, setIsFinish] = useState(false);
  const user = useUser();

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://itfest2025.up.railway.app/api/v1/auth/email/send-code/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send email code");
      }

      const data = await response.json();
      console.log("Email code sent successfully:", data);

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error sending email code:", error);
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async () => {
    setIsLoading2(true);

    try {
      const code = otp.join("");
      const response = await fetch(
        "https://itfest2025.up.railway.app/api/v1/auth/email/confirm-code/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: getValues("email"), code }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to confirm email code");
      }
      const data = await response.json();

      if (data) {
        setIsFinish(true);
        await user.updateProfile({ token: data.token });
      }

      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading2(false);
    }
  };

  const handleOtpChange = async (index, value, event) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    if (event.key === "Backspace" && !value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
      newOtp[index - 1] = "";
    } else {
      newOtp[index] = value.slice(0, 1);
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }

    setOtp(newOtp);
    if (newOtp.every((digit) => digit !== "")) {
      await verifyCode();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100vh",
      width: "100%",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#333",
      textAlign: "left",
    },
    inputContainer: {
      maxWidth: "100%",
      marginBottom: "1.5rem",
      maxHeight: "800px",
      maxWidth: "580px",
    },
    input: {
      width: "100%",
      height: "52px",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 10px 30px 0 rgba(66, 71, 97, 0.1)",
      background: "#fff",
      fontSize: "1rem",
      border: "1px solid #e0e0e0",
      outline: "none",
      color: "#333",
      marginBottom: "10px",
    },
    button: {
      maxWidth: "530px",
      width: "100%",
      height: "52px",
      borderRadius: "12px",
      background: "#FA7275",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "600",
      border: "none",
      cursor: "pointer",
      boxShadow: "0 10px 30px 0 rgba(66, 71, 97, 0.1)",
      transition: "background-color 0.3s",
    },
    linkContainer: {
      marginTop: "1rem",
      fontSize: "0.9rem",
      color: "#888",
    },
    link: {
      marginLeft: "5px",
      color: "#FA7275",
      textDecoration: "none",
      fontWeight: "500",
    },
    errorMessage: {
      color: "red",
      marginBottom: "1rem",
      fontSize: "0.9rem",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: 100,
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      borderRadius: "12px",
      padding: "30px",
      width: "400px",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      zIndex: 200,
    },
    modalTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
    },
    modalDescription: {
      fontSize: "0.9rem",
      color: "#888",
      marginBottom: "20px",
    },
    otpContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    otpInput: {
      width: "50px",
      height: "50px",
      textAlign: "center",
      border: "2px solid #FA7275",
      borderRadius: "8px",
      fontSize: "1.5rem",
      color: "#FA7275",
      outline: "none",
    },
    submitOtpButton: {
      width: "100%",
      padding: "15px",
      background: "#FA7275",
      color: "#fff",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
    },
    modalFooter: {
      fontSize: "0.9rem",
      marginTop: "15px",
      color: "#888",
    },
    resendLink: {
      color: "#FA7275",
      textDecoration: "none",
      marginLeft: "5px",
    },
  };

  return html`
    <section style=${styles.root}>
      <h2 style=${styles.heading}>Login</h2>
      <form onSubmit=${handleSubmit(onSubmit)} style=${styles.inputContainer}>
        <input
          type="email"
          placeholder="Enter your Email"
          style=${styles.input}
          ...${register("email")}
        />
        ${errorMessage &&
        html`<p style=${styles.errorMessage}>${errorMessage}</p>`}
        <button type="submit" style=${styles.button}>
          ${isLoading
            ? html`<div class="loader-container">
                <div class="loader"></div>
              </div>`
            : "Login"}
        </button>
      </form>

      ${isModalOpen &&
      html`
        <div>
          <div style=${styles.modalOverlay} onClick=${closeModal}></div>
          <div style=${styles.modal}>
            <h3 style=${styles.modalTitle}>Enter OTP</h3>
            <p style=${styles.modalDescription}>
              We've sent a code to <strong>${getValues("email")}</strong>
            </p>
            <div style=${styles.otpContainer}>
              ${otp.map(
                (value, index) =>
                  html`
                    <input
                      type="text"
                      value=${value}
                      id=${`otp-input-${index}`}
                      maxlength="1"
                      style=${styles.otpInput}
                      onInput=${(e) =>
                        handleOtpChange(index, e.target.value, e)}
                      onKeyDown=${(e) =>
                        handleOtpChange(index, e.target.value, e)}
                    />
                  `
              )}
            </div>
            <${NavLink} to="/dashboard">
              <button
                onClick=${verifyCode}
                type="submit"
                style=${styles.button}
              >
                ${isLoading2
                  ? html`<div class="loader-container">
                      <div class="loader"></div>
                    </div>`
                  : "Submit"}
              </button><//
            >
          </div>
        </div>
      `}
    </section>
  `;
};
