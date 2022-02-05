const CTA = {
  name: "cta",
  widget: "object",
  fields: [
    {
      name: "body",
      label: "Body",
      required: false,
    },
    {
      name: "href",
      label: "href",
      required: false,
    },
  ],
};

const SOCIALS = {
  name: "socials",
  widget: "list",
  label_singular: "social link",
  fields: [
    {
      name: "type",
      label: "Type",
      widget: "select",
      options: [
        "facebook", "twitter", "instagram", "youtube", "github", "linkedin", "medium"
      ],
      required: false,
    },
    {
      name: "href",
      label: "href",
      required: false,
    },
  ],
};

module.exports = {
  name: "home",
  label: "Home",
  file: "public/data/pages/home.json",
  preview_path: "/",
  fields: [
    {
      name: "bgImage",
      label: "Background Image",
      required: false,
      widget: "image",
    },
    {
      name: "profileImage",
      label: "Profile Image",
      required: false,
      widget: "image",
    },
    {
      name: "name",
      label: "Name",
      required: false,
    },
    {
      name: "jobTitle",
      label: "Job Title",
      required: false,
    },
    {
      name: "location",
      label: "Location",
      required: false,
    },
    {
      name: "body",
      label: "Body",
      widget: "text",
      required: false,
    },
    CTA,
    SOCIALS,
  ],
};
