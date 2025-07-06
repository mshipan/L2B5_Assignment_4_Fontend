import baseApi from "../../baseApi";

const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Books
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["book", "borrow"],
    }),

    // Get a Single Book
    getSingleBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["book"],
    }),

    // Create a Book
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),

    // Update a Book
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),

    // Delete a Book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book", "borrow"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
