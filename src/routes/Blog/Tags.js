import { Fragment } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";

const Tags = ({ tags, withLabel, className }) => {
  const navigate = useNavigate();

  const toTag = (t) => {
    navigate({
      pathname: "/blog",
      search: `?${createSearchParams({ t })}`,
    });
  };

  return (
    <div className={className}>
      {withLabel && <span className="pr-2">Tags:</span>}
      {tags.map((t, idx) => {
        return (
          <Fragment key={idx}>
            <span
              className="text-green-500 no-underline hover:underline cursor-pointer"
              onClick={() => toTag(t)}
            >
              {t}
            </span>
            {idx < tags.length - 1 && <span className="px-1">.</span>}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Tags;
