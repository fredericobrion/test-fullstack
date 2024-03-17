import { useContext, useEffect } from "react";
import Context from "../../context/Context";
import UserCard from "../../components/userCard";
import styles from "./main.module.css";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/users";

function MainPage() {
  const navigate = useNavigate();

  const { users, setUserBeingCreated, setLoading, setUsers, setError } =
    useContext(Context);

  useEffect(() => {
    const getUsersFromDb = async () => {
      try {
        setLoading(true);
        const users = await getAllUsers();
        setUsers(users);
      } catch (e: unknown) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (!users.length) {
      getUsersFromDb();
    }
  }, []);

  const handleNavigateToAdd = () => {
    setUserBeingCreated(null);
    navigate("add");
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          <h2>Listagem de usuários</h2>
          <h3>Escolha um cliente para visualizar os detalhes</h3>
        </div>
        <button onClick={() => handleNavigateToAdd()}>Novo cliente</button>
      </div>
      <div>
        {users.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
      <p className={styles.clientsCount}>Exibindo {users.length} clientes</p>
    </>
  );
}

export default MainPage;
