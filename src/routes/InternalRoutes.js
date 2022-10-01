import React from "react";
import { Route, Routes } from "react-router-dom";

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
function InternalRoutes(props) {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route path="/animal" element={<Animal />} />
      <Route path="/labour" element={<Labour />} />
      <Route path="/expenses/repair" element={<Repair />} />
      <Route path="/expenses/vatrinary" element={<Vatrinary />} />
      <Route path="/fodder" element={<Fodder />} />
      <Route path="/animalSale" element={<AnimalSale />} />
      <Route path="/milkSale" element={<MilkSale />} />
      <Route path="/semenSale" element={<SemenSale />} />
      <Route path="/buffaloCalveSale" element={<BuffaloCalveSale />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default InternalRoutes;
