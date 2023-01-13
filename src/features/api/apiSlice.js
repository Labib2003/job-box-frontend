import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://job-box-backend.onrender.com/api",
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Jobs", "Job", "DM"]
});

export default apiSlice;