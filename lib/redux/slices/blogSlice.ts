import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost, Comment, CommentStatus } from "@/types";
import { initialBlogPosts } from "@/lib/data/blogPosts";
import { CommentFormData } from "@/lib/validations/comment";
import api from "@/lib/axios";

export interface BlogState {
  posts: BlogPost[];
  comments: Comment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BlogState = {
  posts: initialBlogPosts,
  comments: [],
  status: "idle",
  error: null,
};

// Async Thunk: Submit blog comment via API
export const submitComment = createAsyncThunk<
  Comment,
  { postId: string; data: CommentFormData },
  { rejectValue: string }
>("blog/submitComment", async ({ postId, data }, { rejectWithValue }) => {
  try {
    const { data: json } = await api.post("/api/comments", { ...data, post_id: postId });
    if (!json.success) {
      throw new Error(json.message || "Failed to submit comment");
    }
    const newComment: Comment = json.comment || {
      id: `comm-${Date.now()}`,
      post_id: postId,
      customer_name: data.customer_name,
      email: data.email,
      comment: data.comment,
      status: "pending",
      created_at: new Date().toISOString(),
    };
    return newComment;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || err.message || "Failed to post comment"
    );
  }
});

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<BlogPost>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload);
    },
    updateCommentStatus: (
      state,
      action: PayloadAction<{ id: string; status: CommentStatus }>
    ) => {
      const comment = state.comments.find((c) => c.id === action.payload.id);
      if (comment) {
        comment.status = action.payload.status;
      }
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter((c) => c.id !== action.payload);
    },
  },
  // builder with extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(submitComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments.unshift(action.payload);
      })
      .addCase(submitComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to submit comment";
      });
  },
});

export const {
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setComments,
  addComment,
  updateCommentStatus,
  deleteComment,
} = blogSlice.actions;

export default blogSlice.reducer;
