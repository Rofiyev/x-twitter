import { usePostModal } from "@/hooks/usePostModal";
import { useCallback } from "react";
import Form from "../form";
import { AiOutlineClose } from "react-icons/ai";

const PostCreateModal = () => {
  const postModal = usePostModal();

  const handleClose = useCallback(() => {
    postModal.onClose();
  }, [postModal]);

  if (!postModal.isOpen) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
      <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl  lg:h-auto">
        <div className="h-full lg:h-auto border-0 pb-14 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
          <div className="flex items-center justify-between p-4 sm:p-10 rounded-t ">
            <h3 className="text-3xl font-semibold text-white">Create Post</h3>
            <button
              onClick={handleClose}
              className="p-1 ml-auto border-0 text-white hover:opacity-70 transition"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          <div className="relative px-4 sm:px-10 flex-auto">
            <Form placeholder="What's happening!?" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreateModal;
