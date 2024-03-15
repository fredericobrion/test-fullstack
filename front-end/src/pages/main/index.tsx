import { useContext, useEffect } from 'react';
import Context from '../../context/Context';
import UserCard from '../../components/userCard';

function MainPage() {
  const {getUsersFromDb, users} = useContext(Context);

  useEffect(() => {
    if (!users.length) {
      getUsersFromDb();
    }
  }, [])

  return (
    <div>
      {users.map((user) => {
        return <UserCard key={user.id} user={user}/>
      })}
    </div>
  );
}

export default MainPage;
