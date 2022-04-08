export default {
  name: "blogtiles",
  title: "Blogtiles",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "summary",
      title:"Summary",
      type:"string",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block"
        }
      ]
    },
    {
      name: "imgUrl",
      title: "ImgUrl",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "about",
      title: "About",
      type: "string",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          name: "category",
          title: "Category",
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
