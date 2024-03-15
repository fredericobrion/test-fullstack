import { useForm } from "react-hook-form";
import { User } from "../../types/User";
import styles from "./userInputFields.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function UserInputFields() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <form className={styles.form}>
      <input type="text" id="name" placeholder="Nome" />
      <input type="email" id="email" placeholder="E-mail" />
      <input type="text" id="cpf" placeholder="CPF" />
      <input type="text" id="phone" placeholder="Telefone" />
      <select id="status">
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
        <option value="DISABLED">Disabled</option>
        <option value="PENDING">Pending</option>
      </select>
      <div>
        <button type="submit">{location.pathname === '/add' ? "Criar" : "Atualizar"}</button>
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>
    </form>
  );
}

export default UserInputFields;
