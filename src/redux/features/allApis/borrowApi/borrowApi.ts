import baseApi from "../../baseApi";

const borrowAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Borrow a Book
    borrowBook: builder.mutation({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["borrow", "book"],
    }),

    // Get all Borrow Summary
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowAPi;
