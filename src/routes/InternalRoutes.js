import React from "react";
import { Route, Routes,Outlet,Navigate } from "react-router-dom";

import Dashboard from "~/views/Dashboard";
import Animal from "~/views/animal";
import Fodder from "~/views/fodder";
import Settings from "~/views/settings";
import Repair from "~/views/repair";
import Labour from "~/views/labour";
import AnimalSale from "../views/animalSale";
import MilkSale from "../views/milkSale";
import SemenSale from "../views/semenSale";
import BuffaloCalveSale from "../views/buffaloCalveSale";
import Vatrinary from "../views/vaterinary";
import useToken from "../hooks/useToken";
import Users from "../views/users";
import Roles from "../views/roles";
import Priviledges from "../views/priviledges";
const AuthRoute = ({ component: Component, ...rest }) => {
  const { token, setToken } = useToken();

  return token!=undefined ? <Outlet /> : <Navigate to="/login" />;
};
function InternalRoutes(props) {
  return (
    <Routes>
      <Route exact path="/" element={<AuthRoute />} >
      <Route
            path="/"
            exact
            element={<Dashboard />}
          />
      </Route>
      <Route path="/animal" element={<Animal />} />
      <Route path="/labour" element={<Labour />} />
      <Route path="/expenses/repair" element={<Repair />} />
      <Route path="/expenses/vatrinary" element={<Vatrinary />} />
      <Route path="/fodder" element={<Fodder />} />
      <Route path="/animalSale" element={<AnimalSale />} />
      <Route path="/milkSale" element={<MilkSale />} />
      <Route path="/users" element={<Users />} />
      <Route path="/roles" element={<Roles />} />
      <Route path="/priviledges" element={<Priviledges />} />
      <Route path="/semenSale" element={<SemenSale />} />
      <Route path="/buffaloCalveSale" element={<BuffaloCalveSale />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default InternalRoutes;
