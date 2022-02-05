import React from "react";
// prefetch page data wrapper
const withEntry =
  (Component) =>
  ({ entry, ...restProps }) => {
    return <Component data={entry?.get("data").toJS()} {...restProps} />;
  };

export default withEntry;
