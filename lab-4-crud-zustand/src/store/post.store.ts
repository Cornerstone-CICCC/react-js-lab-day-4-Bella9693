import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Post } from "../types/post.type";

interface PostState {
  posts: Post[];
  createPost: (post: Post) => void;
  updatePost: (id: string, title: string, content: string) => void;
  softDeletePost: (id: string) => void;
  recoverPost: (id: string) => void;
  deletePostPermanently: (id: string) => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      posts: [],

      createPost: (post) =>
        set((state) => ({
          posts: [...state.posts, post],
        })),

      updatePost: (id, title, content) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, title, content } : p,
          ),
        })),

      softDeletePost: (id) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, isDeleted: true } : p,
          ),
        })),

      recoverPost: (id) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, isDeleted: false } : p,
          ),
        })),

      deletePostPermanently: (id) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        })),
    }),
    { name: "post-storage" },
  ),
);
