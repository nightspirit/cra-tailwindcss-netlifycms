import { Outlet, useNavigate, createSearchParams } from "react-router-dom";
import { SearchIcon } from "components/Icons";

const Header = ({ title = "Minimal Blog" }) => {
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
    const q = e.target.search.value;

    navigate({
      pathname: "/blog",
      search: `?${createSearchParams({ q })}`,
    });

    return null;
  };

  return (
    <div className="fixed w-full z-10 top-0">
      <div className="bg-gray-100">
        <div id="progress" className="h-1 z-20 top-0"></div>

        <div className="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 pt-3 pb-2 px-4">
          <a
            className="text-gray-900 no-underline font-extrabold text-base md:text-xl"
            href="/blog"
          >
            {title}
          </a>

          <form
            className="flex items-center justify-center border rounded-full bg-white"
            onSubmit={search}
          >
            <div className="pl-2.5 md:pl-3">
              <SearchIcon className="w-3 h-3 md:w-4 md:h-4 fill-current text-gray-300" />
            </div>

            <input
              type="text"
              name="search"
              className="px-2.5 md:px-3 py-1.5 w-36 md:w-48 text-xs md:text-sm outline-none rounded-r-full"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>

      <div className="h-8 bg-gradient-to-b from-gray-100"></div>
    </div>
  );
};

const Layout = () => {
  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
