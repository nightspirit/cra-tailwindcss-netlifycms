import { BriefcaseIcon, GlobeIcon } from "components/Icons";

import Socials from "./Socials";

const Home = ({ data }) => {
  const {
    bgImage,
    profileImage,
    name,
    jobTitle,
    location,
    body,
    cta,
    socials,
  } = data || {};
  
  return (
    <div
      className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover h-screen"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto py-32 lg:py-0">
        <div
          id="profile"
          className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
          <div className="p-4 md:p-12 text-center lg:text-left">
            <div
              className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
              style={{
                backgroundImage: `url('${profileImage}')`,
              }}
            ></div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{name}</h1>
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <BriefcaseIcon className="h-4 fill-current text-green-700 pr-4" />
              {jobTitle}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <GlobeIcon className="h-4 fill-current text-green-700 pr-4" />
              {location}
            </p>
            <p className="pt-8 text-sm">{body}</p>

            <div className="pt-12 pb-8">
              <a
                href={cta?.href}
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-3 px-4 rounded-full"
              >
                {cta?.body}
              </a>
            </div>

            <Socials
              className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between"
              socials={socials}
            />
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <img
            alt=""
            src={profileImage}
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
