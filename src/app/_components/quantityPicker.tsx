import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "~/app/index.module.css";
import { set } from "zod";

export default function QuantityPicker(props: {
  quantity: number;
  setQuantity: (value: number) => void;
}) {
  // Use isEditing & local quantity state to not switch the input field mid-typing
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState<number | undefined>(props.quantity);

  useEffect(() => {
    if (isEditing && quantity === undefined) {
      // The user cleared the input field, don't update the parent state yet
      return;
    }
    if (quantity !== props.quantity) {
      props.setQuantity(quantity ?? 0);
    }
  }, [isEditing, quantity, props.quantity]);

  return props.quantity == 0 && !isEditing ? (
    <button
      style={{ height: "2.5rem", minWidth: "7.5rem" }}
      className={styles.styledButton}
      onClick={() => setQuantity(1)}
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1px",
        }}
      >
        <button
          className={styles.styledButton}
          style={{
            width: "1rem",
            height: "1rem",
            fontSize: "0.8rem",
            border: "0px",
            borderRadius: "0",
            padding: "0 0",
          }}
          onClick={() => {
            setIsEditing(false); // Even if you're focused, trigger the changes when clicking this
            setQuantity((quantity ?? 0) + 1);
          }}
        >
          +
        </button>
        <button
          className={styles.styledButton}
          style={{
            width: "1rem",
            height: "1rem",
            fontSize: "0.8rem",
            border: "0px",
            borderRadius: "0",
            padding: "0 0",
          }}
          onClick={() => {
            setIsEditing(false); // Even if you're focused, trigger the changes when clicking this
            setQuantity((quantity ?? 1) - 1);
          }}
        >
          -
        </button>
      </div>
      <input
        className={styles.quantityPicker}
        name="amount"
        value={quantity ?? ""}
        onChange={(e) => {
          // Only allow numbers this way instead of input type="number" so we can handle empty strings
          if (!/^\d*$/.test(e.target.value)) {
            return;
          }
          setQuantity(
            e.target.value === "" ? undefined : Number(e.target.value)
          );
        }}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
      />
      <button
        className={styles.borderlessButton}
        onClick={(e) => setQuantity(0)}
      >
        <CloseIcon style={{ color: "red" }} />
      </button>
    </div>
  );
}
