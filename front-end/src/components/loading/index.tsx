import styles from "./loading.module.css";
import { pulsar } from "ldrs";

pulsar.register();

function Loading() {
  return (
    <div className={styles.container}>
      <l-pulsar size="120" speed="1.5" color="orange"></l-pulsar>
      <h2>Carregando...</h2>
    </div>
  );
}

export default Loading;
