import { Outlet } from "react-router-dom";
import uolLogo from '../../assets/logo-uol.png';
import styles from './header.module.css';
import userIcon from "../../assets/user-icon.svg";

function Header() {
  return (
    <>
      <header className={styles.header}>
        <img src={uolLogo} alt="Logo da uol" />
      </header>
      <h1 className={styles.title}>
        <img src={userIcon} alt="Logo de usuário" />
        Painel de clientes
      </h1>
      <Outlet />
    </>
  );
}

export default Header;
