import { User } from "../../types/User";
import styles from "./userCard.module.css";
import { useNavigate } from "react-router-dom";

type UserCardProps = {
  user: User;
};

function UserCard({ user }: UserCardProps) {
  const navigate = useNavigate();

  const { cpf, email, id, name, phone, status } = user;

  let statusColor = styles.activeCircle;
  let translatedStatus = "Ativo";

  const defineStatus = () => {
    switch (status) {
      case "ACTIVE":
        statusColor = styles.activeCircle;
        translatedStatus = "Ativo";
        break;
      case "INACTIVE":
        statusColor = styles.inactiveCircle;
        translatedStatus = "Inativo";
        break;
      case "PENDING":
        statusColor = styles.pendingCircle;
        translatedStatus = "Pendente";
        break;
      default:
        statusColor = styles.disabledCircle;
        translatedStatus = "Desativado";
    }
  }

  defineStatus();

  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <p>
          <strong>{name}</strong>
        </p>
        <p>{email}</p>
      </div>
      <div className={styles.col2}>
        <p>
          <strong>{cpf}</strong>
        </p>
        <p>{phone}</p>
      </div>
      <div className={styles.col3}>
        <div className={statusColor}></div>
        <p>{translatedStatus}</p>
      </div>
      <div className={styles.col4}>
        <button onClick={() => navigate(`${id}`)}>Editar</button>
      </div>
    </div>
  );
}

export default UserCard;
