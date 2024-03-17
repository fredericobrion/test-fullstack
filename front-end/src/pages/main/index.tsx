// import { useContext, useEffect } from "react";
// import Context from "../../context/Context";
// import UserCard from "../../components/userCard";
// import styles from "./main.module.css";
// import { useNavigate } from "react-router-dom";
// import { getAllUsers } from "../../services/users";

// function MainPage() {
//   const navigate = useNavigate();

//   const {
//     getUsersFromDb,
//     users,
//     setUserBeingCreated,
//     setLoading,
//     setUsers,
//     setError,
//   } = useContext(Context);
//   // const { getUsersFromDb, users, setUserBeingCreated } = useContext(Context);

//   // useEffect(() => {
//   //   if (!users.length) {
//   //     try {
//   //       getUsersFromDb();
//   //     } catch (e: unknown) {
//   //       console.log((e as Error).message);
//   //     }
//   //   }
//   // }, []);

//   useEffect(() => {
//     const getUsersFromDbTest = async () => {
//       try {
//         setLoading(true);
//         const users = await getAllUsers();
//         setUsers(users);
//       } catch (e: unknown) {
//         setError((e as Error).message);
//         throw new Error((e as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!users.length) {
//       getUsersFromDbTest();
//     }
//   }, []);

//   const handleNavigateToAdd = () => {
//     setUserBeingCreated(null);
//     navigate("add");
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <div>
//           <h2>Listagem de usuários</h2>
//           <h3>Escolha um cliente para visualizar os detalhes</h3>
//         </div>
//         {/* <button onClick={() => navigate("add")}>Novo cliente</button> */}
//         <button onClick={() => handleNavigateToAdd()}>Novo cliente</button>
//       </div>
//       <div>
//         {users.map((user) => {
//           return <UserCard key={user.id} user={user} />;
//         })}
//       </div>
//       <p className={styles.clientsCount}>Exibindo {users.length} clientes</p>
//     </>
//   );
// }

// export default MainPage;

import { useContext, useEffect } from "react";
import Context from "../../context/Context";
import UserCard from "../../components/userCard";
import styles from "./main.module.css";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/users";

function MainPage() {
  const navigate = useNavigate();

  const {
    users,
    setUserBeingCreated,
    setLoading,
    setUsers,
    setError,
  } = useContext(Context);

  useEffect(() => {
    const getUsersFromDbTest = async () => {
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
      getUsersFromDbTest();
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



