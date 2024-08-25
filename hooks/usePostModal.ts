import { create } from "zustand";

interface PostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePostModal = create<PostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
