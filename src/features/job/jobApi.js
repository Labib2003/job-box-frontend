import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
    }),
    getJobs: builder.query({
      query: () => ({
        url: "/jobs",
      }),
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: `/jobs/get/${id}`,
      }),
    }),
    getJobByEmployer: builder.query({
      query: (email) => ({
        url: `/jobs/employer/${email}`,
      }),
    }),
    getJobByCandidate: builder.query({
      query: (email) => ({
        url: `/jobs/candidate/${email}`,
      }),
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobByEmployerQuery,
  useGetJobByCandidateQuery,
  useGetJobsQuery,
  useGetJobByIdQuery,
} = jobApi;
