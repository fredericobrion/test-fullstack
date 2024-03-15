import { Outlet } from "react-router-dom";
import uolLogo from '../../assets/logo-uol.png';
import styles from './header.module.css';

function Header() {
  return (
    <>
      <header className={styles.header}>
        <img src={uolLogo} alt="Logo da uol" />
      </header>
      <Outlet />
    </>
  );
}

export default Header;
