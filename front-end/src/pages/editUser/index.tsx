import { useLocation, useNavigate } from "react-router-dom";
import UserInputFields from "../../components/userInputFields";
import styles from "./editUser.module.css";
import { useContext, useEffect } from "react";
import Context from "../../context/Context";
import { getAllUsers } from "../../services/users";

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.slice(1);

  useEffect(() => {
    const isNumeric = (str: string): boolean => {
      return /^\d+$/.test(str);
    };

    if (!isNumeric(id)) {
      navigate("/not-found");
    }
  }, []);

  const { users, setLoading, setUsers, setError } = useContext(Context);

  useEffect(() => {
    const getUsersFromDb = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();
        setUsers(users);
      } catch (e: unknown) {
        setError((e as Error).message);
        throw new Error((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (!users.length) {
      getUsersFromDb();
    }
  }, []);

  const foundUser = users.find((user) => user.id === Number(id));

  return (
    <>
      <div className={styles.container}>
        <h2>Atualizar usuário</h2>
        <h3>{`Informe os campos a seguir para atualizar o usuário ${
          foundUser ? foundUser.name : ""
        }:`}</h3>
      </div>
      <UserInputFields />
    </>
  );
}

export default EditUser;
