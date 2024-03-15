import { User } from "../../types/User";
import styles from "./userCard.module.css";

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  const { cpf, email, id, name, phone, status } = user;

  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <p>{name}</p>
        <p>{email}</p>
      </div>
      <div className={styles.col2}>
        <p>{phone}</p>
        <p>{cpf}</p>
      </div>
      <div className={styles.col3}>
        <p>{status}</p>
      </div>
      <div className={styles.col4}>
        <button>Editar</button>
      </div>
    </div>
  );
}

export default UserCard;
