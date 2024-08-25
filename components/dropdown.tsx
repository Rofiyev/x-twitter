import { FC, useCallback } from "react";
import axios from "axios";
import usePosts from "@/hooks/usePosts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import toast from "react-hot-toast";
import { CiMenuKebab } from "react-icons/ci";
import { usePostEditModal } from "@/hooks/usePostEditModal";

interface Props {
  postId: string;
}

const Dropdown: FC<Props> = ({ postId }) => {
  const { mutate: fetchPosts } = usePosts();
  const postEditModal = usePostEditModal();

  const handleMenu = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  const handleEdit = useCallback(
    (e: any) => {
      e.stopPropagation();

      postEditModal.onOpen();
      postEditModal.setPostId(postId);
    },
    [postEditModal, postId]
  );

  const handleDelete = useCallback(
    async (e: any) => {
      e.stopPropagation();

      try {
        await axios.delete(`/api/posts/${postId}`);

        toast.success("Post deleted successfully");
      } catch (error) {
        toast.error("Something went wrong!");
      }

      return await fetchPosts();
    },
    [fetchPosts, postId]
  );

  return (
    <Menu>
      <MenuButton
        onClick={handleMenu}
        className="inline-flex hover:bg-neutral-700 p-2 rounded-full items-center text-sm/6 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <CiMenuKebab size={20} color="gray" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-32 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            onClick={handleEdit}
            className="group flex w-full items-center gap-2 rounded-lg py-1 px-3 data-[focus]:bg-white/10"
          >
            Edit
          </button>
        </MenuItem>
        <MenuItem>
          <button
            onClick={handleDelete}
            className="group flex w-full items-center gap-2 rounded-lg py-1 px-3 hover:bg-red-500 transition"
          >
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default Dropdown;
