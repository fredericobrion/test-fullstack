import { useState } from "react";
import styles from "./userInputFields.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { formatCPF, formatPhone } from "../../utils/formatInputs";

function UserInputFields() {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <form className={styles.form}>
      <input type="text" id="name" placeholder="Nome" />
      <input type="email" id="email" placeholder="E-mail" />
      <input
        type="text"
        id="cpf"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(formatCPF(e.target.value))}
      />
      <input
        type="text"
        id="phone"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
      />
      <select id="status">
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
        <option value="DISABLED">Disabled</option>
        <option value="PENDING">Pending</option>
      </select>
      <div>
        <button type="submit">
          {location.pathname === "/add" ? "Criar" : "Atualizar"}
        </button>
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>
    </form>
  );
}

export default UserInputFields;
