import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockBlogPosts } from "@/lib/mockData";
import type { BlogPost } from "@/types";

interface BlogStore {
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  getPostBySlug: (slug: string) => BlogPost | undefined;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      posts: mockBlogPosts,
      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
      updatePost: (post) => set((state) => ({ posts: state.posts.map((item) => (item.id === post.id ? post : item)) })),
      deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
      getPostBySlug: (slug) => get().posts.find((post) => post.slug === slug),
    }),
    { name: "neu-blog-store" },
  ),
);
