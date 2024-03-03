import { Navigate, Route } from "react-router-dom";
import ScheduleCatalog from "./routes/ClientHome/ScheduleCatalog";
import ClientHome from "./routes/ClientHome";
import { Routes } from "react-router-dom";
import ContactCatalog from "./routes/ClientHome/ContactCatalog";
import Login from "./routes/ClientHome/Login";
import AdminHome from "./routes/Admin/AdminHome";
import Admin from "./routes/Admin";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/history";
import { PrivateRoute } from "./components/PrivateRoute";
import { AccessTokenPayloadDTO } from "./models/auth";
import { useEffect, useState } from "react";
import { ContextToken } from "./utils/context-token";
import * as authService from "./services/auth-service"
import ScheduleForm from "./components/ScheduleForm";

export default function App() {
  
  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();
  useEffect(() => {
    if (authService.isAuthenticated()) {
    const payload = authService.getAccessTokenPayload();
    setContextTokenPayload(payload);
    }
    }, []);

  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
    <HistoryRouter history={history}>
      <Routes>

        <Route path="/" element={<ClientHome />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />

          <Route path="schedule/user/:userId" element={<ScheduleCatalog />}/>
          <Route path="schedule/user/new" element={<ScheduleForm />}/>


          <Route path="schedule/:scheduleId" element={<ContactCatalog />} />
        </Route>

        <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN']}><Admin /></PrivateRoute>}>
          <Route index element={<Navigate to="/admin/home" />} />
          <Route path="home" element={<AdminHome />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </HistoryRouter>
    </ContextToken.Provider>
  );
}
