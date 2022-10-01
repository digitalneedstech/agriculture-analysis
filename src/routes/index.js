import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginRegisterPage from "~/views/LoginRegisterPage";
import Home from "~/views/Home";

function RoutesComp(props) {
  return (
    <Routes>
      <Route exact path="/" element={<LoginRegisterPage />} />
      <Route exact path="/home/*" element={<Home />} />
    </Routes>
  );
}

export default RoutesComp;
