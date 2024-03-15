import UserInputFields from "../../components/userInputFields";
import styles from "./editUser.module.css";

function EditUser() {
  return (
    <>
      <div className={styles.container}>
        <h2>Atualizar usuário</h2>
        <h3>Informe os campos a seguir para atualizar o usuário XXXXXX:</h3>
      </div>
      <UserInputFields />
    </>
  );
}

export default EditUser;
