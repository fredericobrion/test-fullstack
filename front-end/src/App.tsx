import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import MainPage from "./pages/main";
import AddUser from "./pages/addUser";
import EditUser from "./pages/editUser";
import NotFoundPage from "./pages/notFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<MainPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path=":id" element={<EditUser />} />
        <Route path="add" element={<AddUser />} />
      </Route>
    </Routes>
  );
}

export default App;
