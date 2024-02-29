

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScheduleCatalog from "./routes/ClientHome/ScheduleCatalog";
import ClientHome from "./routes/ClientHome";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<ClientHome />}>

        <Route index element={<ScheduleCatalog />} />
        <Route path="/schedule" element={<ScheduleCatalog />} />
        <Route path="/schedule/contacts/:scheduleId" element={<ScheduleCatalog />} />
        <Route path="*" element={<h2>NotFound</h2>}
        />

      </Route>
    </Routes>
  </BrowserRouter>
  )
}
