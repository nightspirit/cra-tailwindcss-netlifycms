import { Routes, Route } from "react-router-dom";
import useFetch from "use-http";
import lazy from "utils/lazy";
import withPost from "utils/withPost";

import Layout from "./Layout";

const List = lazy(() => import("./List"));
const Post = withPost(lazy(() => import("./Post")));

const Blog = () => {
  const { loading, data } = useFetch("/posts-index.json", []);

  if (loading) return <div />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<List index={data} />} />
        <Route path="/:slug" element={<Post index={data} />} />
      </Route>
    </Routes>
  );
};

export default Blog;
