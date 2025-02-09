import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "~/app/index.module.css";

export default function QuantityPicker(props: {
  quantity: number;
  setQuantity: (value: number) => void;
}) {
  // Use isEditing to not switch the input field mid-changing it
  const [isEditing, setIsEditing] = useState(false);

  return props.quantity == 0 && !isEditing ? (
    <button
      style={{ height: "2.5rem", minWidth: "7.5rem" }}
      className={styles.styledButton}
      onClick={() => props.setQuantity(1)}
    >
      + Add to Cart
    </button>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <input
        type="number"
        style={{ width: "5rem" }}
        name="amount"
        min="0"
        value={props.quantity}
        onChange={(e) => props.setQuantity(+e.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
      />
      <button
        className={styles.borderlessButton}
        onClick={(e) => props.setQuantity(0)}
      >
        <CloseIcon style={{ color: "red" }} />
      </button>
    </div>
  );
}
