import { useLocation } from "react-router-dom";
import React from "react";
import useFetch from "use-http";

// prefetch page data wrapper
const withPage = (Component) => (props) => {
  const { pathname } = useLocation();
  const dataUrl = `/pages/${pathname === "/" ? "home" : pathname}.json`;
  const { data } = useFetch(dataUrl, []);
  return data ? <Component data={data} {...props} /> : null;
};

export default withPage;
