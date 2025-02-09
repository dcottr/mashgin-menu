import CloseIcon from "@mui/icons-material/Close";
import styles from "~/app/index.module.css";

export default function QuantityPicker(props: {
  quantity: number;
  setQuantity: (value: number) => void;
}) {
  return props.quantity == 0 ? (
    <button
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
      <button
        className={styles.borderlessButton}
        onClick={(e) => props.setQuantity(0)}
      >
        <CloseIcon style={{ color: "red" }} />
      </button>
      <input
        type="number"
        name="amount"
        min="0"
        value={props.quantity}
        onChange={(e) => props.setQuantity(+e.target.value)}
        style={{
          width: "3rem",
          fontSize: "1rem",
        }}
      />
    </div>
  );
}
