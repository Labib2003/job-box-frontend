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
        url: "/jobs/open",
      }),
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: `/jobs/get/${id}`,
      }),
      providesTags: ["Job"],
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
    applyToJob: builder.mutation({
      query: (data) => ({
        url: `/jobs/apply/${data.jobId}`,
        method: "PUT",
        body: data.candidateData,
      }),
    }),
    closeJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/close/${id}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["Job"]
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobByEmployerQuery,
  useGetJobByCandidateQuery,
  useGetJobsQuery,
  useGetJobByIdQuery,
  useApplyToJobMutation,
  useCloseJobMutation,
} = jobApi;
