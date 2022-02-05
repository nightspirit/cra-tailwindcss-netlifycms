import CMS from "netlify-cms-app";
import withEntry from "utils/withEntry";
import Home from "routes/Home";
const HomePreview = withEntry(Home);

let siteUrl = process.env.URL || "http://localhost:3000";
if (!!process.env.DEPLOY_PRIME_URL && process.env.BRANCH !== "master") {
  siteUrl = process.env.DEPLOY_PRIME_URL;
}

const config = {
  site_url: siteUrl,
  backend: {
    name: "git-gateway",
    squash_merges: true,
    branch: process.env.BRANCH || "master",
  },
  local_backend: true,
  media_folder: "public/upload",
  public_folder: "/upload",
  collections: [
    {
      name: "pages",
      label: "Pages",
      files: [require("./pages/home")],
    },
  ],
};

// css
CMS.registerPreviewStyle("/admin/index.css");
// page preview
CMS.registerPreviewTemplate("home", HomePreview);
// init
CMS.init({ config });
