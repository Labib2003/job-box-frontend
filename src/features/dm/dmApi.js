import apiSlice from "../api/apiSlice";

const dmApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDms: builder.query({
      query: ({ role, email }) => ({
        url: `/dms/${role}/${email}`,
      }),
      providesTags: ["DM"],
    }),
    postDmAsEmployer: builder.mutation({
      query: (data) => ({
        url: "dms/employer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DM"],
    }),
    postDmAsCandidate: builder.mutation({
      query: (data) => ({
        url: "dms/candidate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DM"],
    }),
  }),
});

export const { useGetDmsQuery, usePostDmAsEmployerMutation, usePostDmAsCandidateMutation } = dmApi;
