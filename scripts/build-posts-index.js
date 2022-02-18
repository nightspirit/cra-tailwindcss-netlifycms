const fs = require("fs");
const _ = require("lodash");

const DATA_FOLDER = "public/data";
const POSTS_FOLDER = `${DATA_FOLDER}/posts`;

let entries = fs.readdirSync(POSTS_FOLDER).map((file) => {
  let json = fs.readFileSync(`${POSTS_FOLDER}/${file}`);

  return _.pick(JSON.parse(json), [
    "title",
    "description",
    "slug",
    "status",
    "date",
    "tags",
  ]);
});

entries = _.chain(entries)
  .filter(({ status }) => status === "public")
  .sortBy("date")
  .value();

const tagIndex = entries.reduce((acc, post, idx) => {
  post.tags.forEach((t) => {
    if (!_.isArray(acc[t])) acc[t] = [];
    acc[t].push(idx);
  });

  return acc;
}, {});

fs.writeFileSync(
  `${DATA_FOLDER}/posts-index.json`,
  JSON.stringify({ entries, tagIndex })
);
