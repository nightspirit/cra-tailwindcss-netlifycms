import { Fragment } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { DateTime } from "luxon";
import Fuse from "fuse.js";
import orderBy from "lodash/orderBy";

import { TagIcon, SearchIcon } from "components/Icons";
import Tags from "./Tags";

const TagHeader = ({ tag }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="bg-green-600 mr-2 md:mr-3 h-6 w-6 md:h-8 md:w-8 flex justify-center items-center rounded-full">
        <TagIcon className="h-3 md:h-4 fill-current text-gray-100" />
      </div>
      <h1 className="text-2xl md:text-3xl uppercase">{tag}</h1>
    </div>
  );
};

const SearchHeader = ({ search, count }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="bg-green-600 mr-2 md:mr-3 h-6 w-6 md:h-8 md:w-8 flex justify-center items-center rounded-full">
        <SearchIcon className="h-3 md:h-4 fill-current text-gray-100" />
      </div>

      <h1 className="text-2xl md:text-3xl uppercase">{search}</h1>
      <div className="text-gray-600 text-sm ml-4">
        find {count} result{count > 1 ? "s" : ""}
      </div>
    </div>
  );
};

const ListItem = ({ slug, title, description, date, tags }) => {
  return (
    <>
      <Link to={{ pathname: `/blog/${slug}` }} state={{ fromList: true }}>
        <h2 className="font-bold font-sans break-normal text-gray-900 pb-2 text-xl md:text-2xl">
          {title}
        </h2>
      </Link>

      <p className="text-sm md:text-base font-normal text-gray-600 pb-2">
        {DateTime.fromISO(date).toFormat("yyyy-MM-dd")}
      </p>

      <p className="text-sm md:text-base">{description}...</p>

      <Tags className="text-xs md:text-sm text-gray-500 py-4" tags={tags} />
    </>
  );
};

const List = ({ index }) => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("t");
  const search = searchParams.get("q");
  const { entries, tagIndex } = index;

  const fuse = new Fuse(entries, {
    keys: ["title", "tags", "description"],
    threshold: 0.5,
  });

  let displayEntries = entries || [];
  if (tag && tagIndex[tag]) {
    displayEntries = orderBy(
      tagIndex[tag].map((idx) => entries[idx]),
      "date",
      "desc"
    );
  } else if (search) {
    displayEntries = fuse.search(search).map(({ item }) => item);
  } else {
    displayEntries = orderBy(displayEntries, "date", "desc");
  }

  return (
    <div className="container w-full md:max-w-3xl mx-auto pt-20 md:pt-24 pb-10 min-h-screen">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        {(search || tag) && (
          <div className="mb-4">
            <Link className="text-sm text-green-500 font-bold" to="/blog">
              &lt;{" "}
              <span className="cursor-pointer uppercase">
                Back to full list
              </span>
            </Link>
          </div>
        )}

        {tag && <TagHeader tag={tag} />}

        {search && (
          <SearchHeader search={search} count={displayEntries.length} />
        )}

        {displayEntries.map((entry, idx) => (
          <Fragment key={idx}>
            <ListItem {...entry} />
            {idx < displayEntries.length - 1 && (
              <hr className="border-b-1 border-gray-400 mt-2 mb-6" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default List;
