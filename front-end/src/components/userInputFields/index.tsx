import { useContext, useEffect, useState } from "react";
import styles from "./userInputFields.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { formatCPF, formatPhone } from "../../utils/formatInputs";
import Context from "../../context/Context";
import { validateInputs } from "../../utils/validateInputs";
import { createUser, updateUser } from "../../services/users";

type status = "ACTIVE" | "INACTIVE" | "DISABLED" | "PENDING";

function UserInputFields() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    users,
    setLoading,
    error,
    setError,
    setUserBeingCreated,
    userBeingCreated,
    setUsers,
  } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<status>("");
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    cpfFormat: false,
    phone: false,
    status: false,
    validsInputs: false,
  });

  useEffect(() => {
    const checkUserBeingCreated = () => {
      if (userBeingCreated) {
        setName(userBeingCreated.name);
        setEmail(userBeingCreated.email);
        setCpf(userBeingCreated.cpf);
        setPhone(userBeingCreated.phone);
        setStatus(userBeingCreated.status);
      }
    };

    const checkExistingUser = () => {
      const id = location.pathname.slice(1);
      const foundUser = users.find((user) => user.id === Number(id));
      if (foundUser) {
        setName(foundUser.name);
        setEmail(foundUser.email);
        setCpf(foundUser.cpf);
        setPhone(foundUser.phone);
        setStatus(foundUser.status);
      }
    };

    if (location.pathname !== "/add") {
      setUserBeingCreated(null);
      checkExistingUser();
    } else {
      checkUserBeingCreated();
    }
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const inputsValidations = validateInputs(name, email, cpf, phone, status);
      setErrors(inputsValidations);
      if (inputsValidations.validsInputs) {
        setLoading(true);
        const createdUser = await createUser({ name, email, cpf, phone, status });
        setUsers([...users, createdUser]);
        setError("");
        setUserBeingCreated(null);
        navigate("/");
      }
    } catch (e: unknown) {
      setError((e as Error).message);
      setUserBeingCreated({ name, email, cpf, phone, status });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const id = location.pathname.slice(1);
      const inputsValidations = validateInputs(name, email, cpf, phone, status);
      setErrors(inputsValidations);
      if (inputsValidations.validsInputs) {
        setLoading(true);
        await updateUser({ id: Number(id), name, email, cpf, phone, status });
        const updatedUsers = users.map((u) => {
          if (u.id === Number(id)) {
            return { id: Number(id), name, email, cpf, phone, status };
          }
          return u;
        });
        setUsers(updatedUsers);
        navigate("/");
      }
    } catch (e: unknown) {
      setError((e as Error).message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateBack = () => {
    setUserBeingCreated(null);
    setError("");
    navigate("/");
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) =>
        location.pathname === "/add" ? handleCreate(e) : handleUpdate(e)
      }
    >
      {error !== "" && <h2>{error}!</h2>}
      <input
        type="text"
        id="name"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && (
        <p className={styles.error}>O usuário deve ter um nome.</p>
      )}
      <input
        type="email"
        id="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className={styles.error}>E-mail inválido.</p>}
      <input
        type="text"
        id="cpf"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(formatCPF(e.target.value))}
      />
      {errors.cpfFormat && (
        <p className={styles.error}>
          Formato inválido. O CPF deve ter 11 digitos.
        </p>
      )}
      <input
        type="text"
        id="phone"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
      />
      {errors.phone && (
        <p className={styles.error}>
          Formato inválido. O celular deve ter DDD + 8 digitos.
        </p>
      )}
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as status)}
      >
        <option value="">Status</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
        <option value="DISABLED">Disabled</option>
        <option value="PENDING">Pending</option>
      </select>
      {errors.status && <p className={styles.error}>Selecione um status.</p>}
      <div>
        <button type="submit">
          {location.pathname === "/add" ? "Criar" : "Atualizar"}
        </button>
        <button onClick={() => handleNavigateBack()}>Voltar</button>
      </div>
    </form>
  );
}

export default UserInputFields;
