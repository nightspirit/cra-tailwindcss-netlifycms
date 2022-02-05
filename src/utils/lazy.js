import React, { Suspense } from "react";

// lazy load component
const lazy = (loader) => (props) => {
  const Component = React.lazy(loader);
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
};

export default lazy;
