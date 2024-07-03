import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchQuery } from "../../_base-query";

export const adminDemo = createApi({
  reducerPath: "adminDemo",
  baseQuery: fetchQuery,
  endpoints: (builder) => ({
    getAccountCenter: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/account/center" }),
      keepUnusedDataFor: 0,
    }),
    getAccountSettings: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/account/settings" }),
      keepUnusedDataFor: 0,
    }),
    getChat: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/chat" }),
      keepUnusedDataFor: 0,
    }),
    getEditorFlow: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/editor/flow" }),
      keepUnusedDataFor: 0,
    }),
    getEditorJsonViewer: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/editor/json-viewer" }),
      keepUnusedDataFor: 0,
    }),
    getDashboardAnalysis: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/dashboard/analysis" }),
      keepUnusedDataFor: 0,
    }),
    getDashboardMonitor: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/dashboard/monitor" }),
      keepUnusedDataFor: 0,
    }),
    getDashboardWorkplace: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/dashboard/workplace" }),
      keepUnusedDataFor: 0,
    }),
    getExcelExport: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/excel/export" }),
      keepUnusedDataFor: 0,
    }),
    getGamePockerContent: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/game/pocker-content" }),
      keepUnusedDataFor: 0,
    }),
    getHealthAnxietyDepression: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/health/anxiety-depression" }),
      keepUnusedDataFor: 0,
    }),
    getHealthCericalVertebra: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/health/cerical-vertebra" }),
      keepUnusedDataFor: 0,
    }),
    getHealthHand: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/health/hand" }),
      keepUnusedDataFor: 0,
    }),
    getHealthObesity: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/health/obesity" }),
      keepUnusedDataFor: 0,
    }),
    getHealthSleep: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/health/sleep" }),
      keepUnusedDataFor: 0,
    }),
    getHealthSport: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/health/sport" }),
      keepUnusedDataFor: 0,
    }),
    getHealthVision: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/health/vision" }),
      keepUnusedDataFor: 0,
    }),
    getLibQrcode: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/lib/qrcode" }),
      keepUnusedDataFor: 0,
    }),
    getListBasicList: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/list/basic-list" }),
      keepUnusedDataFor: 0,
    }),
    getListCardList: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/list/card-list" }),
      keepUnusedDataFor: 0,
    }),
    getListTableList: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/list/table-list" }),
      keepUnusedDataFor: 0,
    }),
    getListSearchApplications: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/list/seartch/applications" }),
      keepUnusedDataFor: 0,
    }),
    getListSearchArticles: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/list/seartch/articles" }),
      keepUnusedDataFor: 0,
    }),
    getListSearchProjects: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/list/seartch/projects" }),
      keepUnusedDataFor: 0,
    }),
    getProfileBasic: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/profile/basic" }),
      keepUnusedDataFor: 0,
    }),
    getProfileAdvanced: builder.query({
      transformResponse: (data: any) => data?.data,
      query: () => ({ url: "admin/demo/profile/advanced" }),
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  // account
  useGetAccountCenterQuery,
  useGetAccountSettingsQuery,
  // dashboard
  useGetDashboardAnalysisQuery,
  useGetDashboardMonitorQuery,
  useLazyGetDashboardWorkplaceQuery,
  // chat
  useGetChatQuery,
  // editor
  useGetEditorFlowQuery,
  useGetEditorJsonViewerQuery,
  // excel
  useGetExcelExportQuery,
  //game
  useGetGamePockerContentQuery,
  // health
  useGetHealthAnxietyDepressionQuery,
  useGetHealthCericalVertebraQuery,
  useGetHealthHandQuery,
  useGetHealthObesityQuery,
  useGetHealthSleepQuery,
  useGetHealthSportQuery,
  useGetHealthVisionQuery,
  // lib
  useGetLibQrcodeQuery,
  // list
  useGetListBasicListQuery,
  useGetListCardListQuery,
  useGetListTableListQuery,
  // list search
  useGetListSearchApplicationsQuery,
  useGetListSearchArticlesQuery,
  useGetListSearchProjectsQuery,
  //profie
  useGetProfileAdvancedQuery,
  useGetProfileBasicQuery,
} = adminDemo;
