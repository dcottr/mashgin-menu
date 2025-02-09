import { useState } from "react";

import styles from "~/app/index.module.css";

export default function Payment(props: {
  setError: (errorMessage: string) => void;
  onSubmit: (params: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    name: string;
  }) => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  return (
    <div
      style={{
        maxWidth: "400px",
        padding: "1.5rem",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Payment</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(name);
          if (!cardNumber || cardNumber.toString().length < 16) {
            props.setError("Card number must be 16 digits");
          } else if (!expiry || expiry.length < 5) {
            props.setError("Expirty should be MM/YY");
          } else if (!cvv || cvv.length < 3) {
            props.setError("CVV should be at least 3 digits");
          } else if (!name) {
            props.setError("Name is required");
          } else {
            props.onSubmit({ cardNumber, expiry, cvv, name });
          }
        }}
      >
        <div>
          <label>Card Number</label>
          <input
            type="number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className={styles.creditCardInput}
            placeholder="1234 1234 1234 1234"
          />
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.creditCardInput}
            placeholder="John Doe"
          />
        </div>
        <div style={{ display: "flex", gap: "10px", paddingBottom: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>Expiry</label>
            <input
              type="text"
              value={expiry}
              onChange={(e) => {
                const newExpiry = e.target.value;
                // TODO: could do more validation
                if (
                  !isNaN(+newExpiry.replace("/", "")) &&
                  !newExpiry.includes(".")
                ) {
                  setExpiry(e.target.value);
                }
              }}
              className={styles.creditCardInput}
              placeholder="MM/YY"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>CVV</label>
            <input
              type="number"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className={styles.creditCardInput}
              placeholder="123"
            />
          </div>
        </div>
        <button
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          className={styles.styledButton}
        >
          Check Out
        </button>
      </form>
    </div>
  );
}
