import { useEffect } from "react";
import { Remark } from "react-remark";
import { DateTime } from "luxon";
import { useNavigate, useLocation } from "react-router-dom";
import findIndex from "lodash/findIndex";
import Tags from "./Tags";

const useProgress = () => {
  useEffect(() => {
    const progressUpdate = () => {
      let scroll =
        ((document.documentElement["scrollTop"] || document.body["scrollTop"]) /
          ((document.documentElement["scrollHeight"] ||
            document.body["scrollHeight"]) -
            document.documentElement.clientHeight)) *
        100;
      document
        .querySelector("#progress")
        .style.setProperty("--scroll", scroll + "%");
    };

    document.addEventListener("scroll", progressUpdate);

    return () => {
      document.removeEventListener("scroll", progressUpdate);
    };
  }, []);
};

export const PostBody = ({ data }) => {
  const { title, date, body } = data;

  return (
    <div className="w-full px-4 md:px-6 py-6 text-gray-800 leading-normal font-sans">
      <h1 className="font-bold break-normal text-gray-900 pb-2 text-3xl md:text-4xl">
        {title}
      </h1>

      <div className="text-sm md:text-base font-normal text-gray-600 pb-2">
        {DateTime.fromISO(date).toFormat("yyyy-MM-dd")}
      </div>

      <div className="post-body">
        <Remark>{body}</Remark>
      </div>
    </div>
  );
};

const Footer = ({ navigate, prev, next }) => {
  return (
    <div className="font-sans flex justify-between content-center px-4 pb-10 md:pb-12">
      {prev ? (
        <div className="text-left">
          <div className="text-xs md:text-sm font-normal text-gray-600 pb-1 md:pb-2">
            &lt; Previous Post
          </div>
          <div
            className="break-normal text-sm md:text-base text-green-500 font-bold no-underline hover:underline cursor-pointer"
            onClick={() => navigate({ pathname: `/blog/${prev?.slug}` })}
          >
            {prev?.title}
          </div>
        </div>
      ) : (
        <div />
      )}
      {next ? (
        <div className="text-right">
          <div className="text-xs md:text-sm font-normal text-gray-600 pb-1 md:pb-2">
            Next Post &gt;
          </div>
          <div
            className="break-normal text-sm md:text-base text-green-500 font-bold no-underline hover:underline cursor-pointer"
            onClick={() => navigate({ pathname: `/blog/${next?.slug}` })}
          >
            {next?.title}
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

const findPrevNext = (entries, slug) => {
  const i = findIndex(entries, (entry) => entry?.slug === slug);
  const prev = i > 0 ? entries[i - 1] : null;
  const next =
    i < entries.length - 1 && entries.length > 1 ? entries[i + 1] : null;
  return { prev, next };
};

const Post = ({ data, index }) => {
  const { slug, tags } = data;
  const { entries } = index;
  const navigate = useNavigate();
  const location = useLocation();
  const back = () => {
    if (location.state?.fromList) {
      navigate(-1);
    } else {
      navigate({
        pathname: "/blog",
      });
    }
  };
  
  useProgress();

  return (
    <div className="container w-full md:max-w-3xl mx-auto pt-20 md:pt-24">
      <div className="text-sm text-green-500 font-bold px-4 md:px-6">
        &lt;{" "}
        <span className="cursor-pointer uppercase" onClick={back}>
          Back to directory
        </span>
      </div>

      <PostBody data={data} back={back} />

      <Tags className="text-gray-500 text-sm px-4 pb-6" tags={tags} withLabel />

      <hr className="border-b-2 border-gray-400 mb-6 mx-4" />

      <Footer navigate={navigate} {...findPrevNext(entries, slug)} />
    </div>
  );
};

export default Post;
