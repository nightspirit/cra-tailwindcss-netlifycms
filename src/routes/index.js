import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import lazy from "utils/lazy";
import withPage from "utils/withPage";

// Page Compoent
const Home = withPage(lazy(() => import("./Home")));
const Blog = lazy(() => import("./Blog"));

const routes = () => (
  <Routes>
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/blog/*" element={<Blog />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default routes;
