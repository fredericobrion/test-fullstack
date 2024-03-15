import { User } from "../../types/User";
import styles from "./userCard.module.css";
import { useNavigate } from "react-router-dom";

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate();

  const { cpf, email, id, name, phone, status } = user;

  const statusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return styles.activeCircle;
      case "INACTIVE":
        return styles.inactiveCircle;
      case "PENDING":
        return styles.pendingCircle;
      default:
        return styles.disabledCircle;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <p><strong>{name}</strong></p>
        <p>{email}</p>
      </div>
      <div className={styles.col2}>
        <p><strong>{cpf}</strong></p>
        <p>{phone}</p>
      </div>
      <div className={styles.col3}>
        <div className={statusColor(status)}></div>
        <p>{status}</p>
      </div>
      <div className={styles.col4}>
        <button onClick={() => navigate(`${id}`)}>Editar</button>
      </div>
    </div>
  );
}

export default UserCard;
