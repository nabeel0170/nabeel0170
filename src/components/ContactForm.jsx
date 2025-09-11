import React from "react";
// Styles
import styled from "styled-components";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
// Components
import { Alert, Button, Form, Spinner } from "react-bootstrap";

// #region styled-components
const StyledForm = styled.div`
  .form-control {
    background: ${({ theme }) =>
      theme.name === "light"
        ? "rgba(var(--bs-body-color-rgb), 0.03)"
        : "var(--bs-gray-dark)"};
  }
`;
// #endregion

// #region component
const ContactForm = () => {
  const [isValidated, setIsValidated] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [dangerMessage, setDangerMessage] = React.useState(null);
  const theme = useSelector(selectMode);

  const sendEmail = async (templateParams) => {
    // Create a well-formatted email
    const subject = `Portfolio Contact from ${templateParams.name}`;
    const body = `Hi Nabeel,

I found your portfolio and would like to get in touch.

Name: ${templateParams.name}
Email: ${templateParams.email}

Message:
${templateParams.message}

Best regards,
${templateParams.name}`;

    // Try multiple email service URLs
    const emailUrls = [
      // Gmail compose URL
      `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=nabeelazar0170@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      // Outlook web compose URL
      `https://outlook.live.com/mail/0/deeplink/compose?to=nabeelazar0170@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      // Yahoo mail compose URL
      `https://compose.mail.yahoo.com/?to=nabeelazar0170@gmail.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    ];

    // Try to open Gmail first
    try {
      const newWindow = window.open(
        emailUrls[0],
        "_blank",
        "noopener,noreferrer",
      );

      // Check if window opened successfully
      if (newWindow && !newWindow.closed) {
        // Success - Gmail opened
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ ok: true });
          }, 1000);
        });
      } else {
        throw new Error("Popup blocked or failed to open");
      }
    } catch (error) {
      // Fallback: Create a temporary link and click it
      const tempLink = document.createElement("a");
      tempLink.href = emailUrls[0];
      tempLink.target = "_blank";
      tempLink.rel = "noopener noreferrer";
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ok: true });
        }, 1000);
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    setSuccess(false);
    setDanger(false);
    setDangerMessage(null);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setIsValidated(true);
      return;
    }

    setIsValidated(true);
    setIsProcessing(true);

    const { name, email, message } = form.elements;
    const templateParams = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    try {
      await sendEmail(templateParams);
      setIsProcessing(false);
      setIsValidated(false);
      form.reset();
      setSuccess(true);

      // Auto-dismiss success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      setIsProcessing(false);
      setIsValidated(false);
      setDangerMessage("Failed to send email. Please try again.");
      setDanger(true);

      // Auto-dismiss error message after 7 seconds
      setTimeout(() => {
        setDanger(false);
      }, 7000);
    }
  };

  return (
    <StyledForm>
      <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
        <Form.Group className="mx-auto mb-3 form-group" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" placeholder="Your name" />
          <Form.Control.Feedback type="invalid">
            <h5>Name must be at least one character.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
            placeholder="someone@something.com"
          />
          <Form.Control.Feedback type="invalid">
            <h5>Please enter a valid email.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto mb-3 form-group" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control required as="textarea" placeholder="Your message..." />
          <Form.Control.Feedback type="invalid">
            <h5>Please provide a valid message.</h5>
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mx-auto text-center form-group">
          <Button
            size="lg"
            variant="primary"
            type="submit"
            disabled={isProcessing}
            className="my-4"
          >
            {isProcessing ? (
              <>
                Sending...{" "}
                <Spinner animation="border" size="sm" className="ms-2" />
              </>
            ) : (
              "Send Message"
            )}
          </Button>

          <div className="mt-3">
            <p className="mb-2 text-muted">Or connect with me directly:</p>
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              <a
                href="https://github.com/nabeel0170"
                className="btn btn-outline-primary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderColor: theme === "light" ? "#667eea" : "#f093fb",
                  color: theme === "light" ? "#667eea" : "#f093fb",
                  backgroundColor: "transparent",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme === "light" ? "#667eea" : "#f093fb";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = theme === "light" ? "#667eea" : "#f093fb";
                }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nabeel-azar/"
                className="btn btn-outline-primary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderColor: theme === "light" ? "#667eea" : "#f093fb",
                  color: theme === "light" ? "#667eea" : "#f093fb",
                  backgroundColor: "transparent",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme === "light" ? "#667eea" : "#f093fb";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = theme === "light" ? "#667eea" : "#f093fb";
                }}
              >
                LinkedIn
              </a>
            </div>
          </div>

          {success && (
            <Alert
              variant="success"
              onClose={() => setSuccess(false)}
              dismissible
              className="mt-3"
            >
              <Alert.Heading>✅ Email Service Opened!</Alert.Heading>
              <p className="mb-0">
                A new tab should have opened with Gmail (or your default email
                service) with your message ready. Just click send!
              </p>
            </Alert>
          )}

          {danger && (
            <Alert
              variant="danger"
              onClose={() => setDanger(false)}
              dismissible
              className="mt-3"
            >
              <Alert.Heading>❌ Error</Alert.Heading>
              <p className="mb-0">{dangerMessage}</p>
            </Alert>
          )}
        </Form.Group>
      </Form>
    </StyledForm>
  );
};
// #endregion

export default ContactForm;
