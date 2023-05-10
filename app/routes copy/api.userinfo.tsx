import { json } from "@remix-run/node";

export const loader = () => {
  return json({
    role: 'admin',
    routes: [
      {
        id: "routes/_a.($lang).auth",
      },
      //account
      {
        id: "routes/_a.($lang).account.center",
      },
      {
        id: "routes/_a.($lang).account.settings",
      },
      // article 
      {
        id: "routes/_a.($lang).article.$id",
      },
      // dashboard
      {
        id: "routes/_a.($lang).dashboard.analysis",
      },
      {
        id: "routes/_a.($lang).dashboard.monitor",
      },
      {
        id: "routes/_a.($lang).dashboard.workplace",
      },
      // editor
      {
        id: "routes/_a.($lang).editor.flow",
      },
      {
        id: "routes/_a.($lang).editor.mind",
      },
      // exception
      {
        id: "routes/_a.($lang).exception.403",
      },
      {
        id: "routes/_a.($lang).exception.404",
      },
      {
        id: "routes/_a.($lang).exception.500",
      },
      // form
      {
        id: "routes/_a.($lang).form.advanced-form",
      },
      {
        id: "routes/_a.($lang).form.basic-form",
      },
      {
        id: "routes/_a.($lang).form.step-form",
      },
      // list
      {
        id: "routes/_a.($lang).list.basic-list",
      },
      {
        id: "routes/_a.($lang).list.card-list",
      },
      {
        id: "routes/_a.($lang).list.table-list",
      },
      {
        id: "routes/_a.($lang).list.search.applications",
      },
      {
        id: "routes/_a.($lang).list.search.articles",
      },
      {
        id: "routes/_a.($lang).list.search.projects",
      },
      // profile
      {
        id: "routes/_a.($lang).profile.advanced",
      },
      {
        id: "routes/_a.($lang).profile.basic",
      },
      // result
      {
        id: "routes/_a.($lang).result.fail",
      },
      {
        id: "routes/_a.($lang).result.success",
      },
    ],
  });
};
