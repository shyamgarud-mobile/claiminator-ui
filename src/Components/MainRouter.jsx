import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../Pages/Login";
import ShowClaim from "../Pages/ShowClaim";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/showclaim" element={<ShowClaim />} />

      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default MainRouter;
