import { BrowserRouter, Navigate, Route } from "react-router-dom";
import ScheduleCatalog from "./routes/ClientHome/ScheduleCatalog";
import ClientHome from "./routes/ClientHome";
import { Routes } from "react-router-dom";
import ContactCatalog from "./routes/ClientHome/ContactCatalog";
import Login from "./routes/ClientHome/Login";
import AdminHome from "./routes/Admin/AdminHome";
import Admin from "./routes/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientHome />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="schedule" element={<ScheduleCatalog />} />
          <Route path="schedule/:scheduleId" element={<ContactCatalog />} />
        </Route>

<Route path="/admin/" element={<Admin />}>
<Route index element={<Navigate to= "/admin/home"/>} />
<Route path="home" element={<AdminHome />} />

</Route>


        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}
