export default function() {
  return [
    {
      title: "Tạo tài khoản quản trị",
      to: "/create-account",
      htmlBefore: '<i class="material-icons">person_add</i>',
      htmlAfter: ""
    },
    {
      title: "Quản lý tag kĩ năng",
      htmlBefore: '<i class="material-icons">local_offer</i>',
      to: "/tag-skill",
    },
    {
      title: "Quản lý người dạy",
      htmlBefore: '<i class="material-icons">people_alt</i>',
      to: "/manager-teacher",
    },
    {
      title: "Quản lý người học",
      htmlBefore: '<i class="material-icons">school</i>',
      to: "/manager-student",
    },
    {
      title: "Quản lý hợp đồng học",
      to: "/manager-contract",
      htmlBefore: '<i class="material-icons">work</i>',
    },
    {
      title: "Quản lý khiếu nại",
      to: "/manager-complaint",
      htmlBefore: '<i class="material-icons">gavel</i>',
    },
    {
      title: "Biểu đồ doanh thu",
      to: "/income-overview",
      htmlBefore: '<i class="material-icons">assessment</i>',
    },
    {
      title: "Top doanh thu người dạy",
      to: "/top-teacher-income",
      htmlBefore: '<i class="material-icons">format_list_numbered</i>',
    },
    {
      title: "Top doanh thu kỹ năng",
      to: "/top-skill-income",
      htmlBefore: '<i class="material-icons">show_chart</i>',
      htmlAfter: ""
    },
    {
      title: "Blog Dashboard",
      to: "/blog-overview",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog-posts",
    },
    {
      title: "Add New Post",
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: "/add-new-post",
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview",
    },
    {
      title: "Tables",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/tables",
    },

  ];
}
