import CMS from 'netlify-cms-app';
import withEntry from "utils/withEntry";
import Home from "routes/Home";
import { PostBody } from "routes/Blog/Post";

// previews
const HomePreview = withEntry(Home);
const PostPreview = withEntry(PostBody);

let siteUrl =
  !!process.env.DEPLOY_PRIME_URL && process.env.BRANCH !== "master"
    ? process.env.DEPLOY_PRIME_URL
    : process.env.URL || "http://localhost:3000";

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
      name: "page",
      label: "Page",
      files: [require("./pages/home")],
    },
    require("./post"),
  ],
};

// css
CMS.registerPreviewStyle("/admin/index.css");
// page preview
CMS.registerPreviewTemplate("home", HomePreview);
CMS.registerPreviewTemplate("post", PostPreview);
// init
CMS.init({ config });
