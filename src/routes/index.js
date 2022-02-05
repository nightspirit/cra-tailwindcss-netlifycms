import { Routes, Route } from "react-router-dom";
import React from "react";
import lazy from "utils/lazy";
import withData from "utils/withData";

// Page Compoent
const Home = withData(lazy(() => import("./Home")));

const Blog = withData(() => {
  return <div>Blog</div>;
});

const routes = () => (
  <Routes>
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:slug" element={<Blog />} />
    </Route>
  </Routes>
);

export default routes;
