module.exports = {
  name: "post",
  label: "Post",
  folder: "public/data/posts",
  extension: "json",
  slug: '{{fields.slug}}',
  preview_path: '/blog/{{fields.slug}}',
  sortable_fields: ['date', 'title'],
  summary: '{{fields.title}} | {{fields.status}}',
  create: true,
  fields: [
    {
      name: 'status',
      label: 'Status',
      widget: 'select',
      options: ['public', 'unlisted', 'archived'],
      default: 'public',
    },
    {
      name: 'title',
      label: 'Title',
    },
    {
      name: 'slug',
    },
    {
      name: 'date',
      label: 'Date',
      widget: 'datetime',
    },
    {
      name: 'body',
      widget: 'markdown',
    },
    {
      name: 'description',
      widget: 'markdown',
      required: false,
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      widget: 'image',
      required: false,
    },
    {
      name: "tags",
      widget: "list",
      label_singular: "tag"
    }
  ],
};
