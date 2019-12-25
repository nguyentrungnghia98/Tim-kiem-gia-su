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
      title: "Thống kê doanh thu",
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
    }
  ];
}
