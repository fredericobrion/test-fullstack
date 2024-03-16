import { useLocation } from "react-router-dom";
import UserInputFields from "../../components/userInputFields";
import styles from "./editUser.module.css";
import { useContext, useEffect } from "react";
import Context from "../../context/Context";

function EditUser() {
  const location = useLocation();

  const { users, getUsersFromDb } = useContext(Context);

  useEffect(() => {
    if (!users.length) {
      getUsersFromDb();
    }
  }, []);

  const id = location.pathname.slice(1);
  const foundUser = users.find((user) => user.id === Number(id));

  return (
    <>
      <div className={styles.container}>
        <h2>Atualizar usuário</h2>
        <h3>{`Informe os campos a seguir para atualizar o usuário ${foundUser ? foundUser.name : ""}:`}</h3>
      </div>
      <UserInputFields />
    </>
  );
}

export default EditUser;
