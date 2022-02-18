import { useParams, Navigate } from "react-router-dom";
import React from "react";
import useFetch from "use-http";

// prefetch blog post data wrapper
const withPost = (Component) => (props) => {
  const { slug } = useParams();
  const dataUrl = `/posts/${slug}.json`;
  const { data, error } = useFetch(dataUrl, [slug]);
  return error ? (
    // if error return to blog directory
    <Navigate to="/blog" replace />
  ) : data ? (
    <Component data={data} {...props} />
  ) : null;
};

export default withPost;
