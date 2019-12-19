import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import EmptyLayout from "./layouts/Empty";

// Route Views
import BlogOverview from "./views/BlogOverview";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import Login from "./containers/LoginContainer";
import CreateNewAccount from "./containers/CreateUserContainer";
import UserProfile from "./views/UserProfile";
import TagSkill from "./views/TagSkill";
import ManagerUsers from "./views/ManagerUsers";
import ManagerStudents from "./views/ManagerStudents";
import UserDetail from "./views/UserDetail";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: EmptyLayout,
    component: Login
  },
  {
    path: "/create-account",
    layout: DefaultLayout,
    component:CreateNewAccount 
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/tag-skill",
    layout: DefaultLayout,
    component: TagSkill
  },
  {
    path: "/manager-user",
    layout: DefaultLayout,
    component: ManagerUsers
  },
  {
    path: "/manager-student",
    layout: DefaultLayout,
    component: ManagerStudents
  },
  {
    path: "/user-detail/:id",
    layout: DefaultLayout,
    component: UserDetail
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  {

    layout: DefaultLayout,
    component: Errors
  },
];
