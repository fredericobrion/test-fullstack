import { useNavigate } from "react-router-dom";
import styles from "./notFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Ops, página não encontrada!</h1>
      <button onClick={() => navigate("/")}>Voltar</button>
    </div>
  );
}

export default NotFoundPage;
