import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "~/views/Dashboard";

function InternalRoutes(props) {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default InternalRoutes;
