

import { BrowserRouter, Navigate, Route } from "react-router-dom";
import ScheduleCatalog from "./routes/ClientHome/ScheduleCatalog";
import ClientHome from "./routes/ClientHome";
import { Routes } from "react-router-dom";
import ContactCatalog from "./routes/ClientHome/ContactCatalog";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ClientHome />}>
        <Route index element={<ScheduleCatalog />} />
        <Route path="/schedule" element={<ScheduleCatalog />} />
        <Route path="/schedule/:scheduleId" element={<ContactCatalog />} />
      </Route>
      <Route path="*" element={<Navigate to={"/"}/>} />
    </Routes>
  </BrowserRouter>
  )
}
