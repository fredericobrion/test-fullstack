import { useContext, useEffect } from "react";
import Context from "../../context/Context";
import UserCard from "../../components/userCard";
import styles from './main.module.css';
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const { getUsersFromDb, users } = useContext(Context);

  useEffect(() => {
    if (!users.length) {
      getUsersFromDb();
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div>
          <h2>Listagem de usuários</h2>
          <h3>Escolha um cliente para visualizar os detalhes</h3>
        </div>
        <button onClick={() => navigate('add')}>Novo cliente</button>
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
