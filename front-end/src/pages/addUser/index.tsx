import UserInputFields from "../../components/userInputFields";
import styles from "./addUser.module.css";

function AddUser() {
  return (
    <>
      <div className={styles.container}>
        <h2>Novo usuário</h2>
        <h3>Informe os campos a seguir para criar novo usuário:</h3>
      </div>
      <UserInputFields />
    </>
  );
}

export default AddUser;
