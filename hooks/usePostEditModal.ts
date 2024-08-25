import { create } from "zustand";

interface PostModalStore {
  postId: string;
  isOpen: boolean;
  setPostId: (id: string) => void;
  removePostId: () => void;
  onOpen: () => void;
  onClose: () => void;
}

export const usePostEditModal = create<PostModalStore>((set) => ({
  postId: "",
  isOpen: false,
  setPostId: (id: string) => set({ postId: id }),
  removePostId: () => set({ postId: "" }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
