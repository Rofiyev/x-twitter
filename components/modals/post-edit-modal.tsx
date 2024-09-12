import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

import Avatar from "../avatar";
import Button from "../button";

import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import { usePostEditModal } from "@/hooks/usePostEditModal";
import TextareaForm from "../textarea-form";
import Image from "next/image";
import { HiMiniXMark } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const PostEditModal = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const postEdit = usePostEditModal();
  const { data: post } = usePost(postEdit.postId);
  const { mutate: mutatePosts } = usePosts();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (post) {
      setBody(post.body);
      setImages(post.images);
      console.log(post);
    }
  }, [post]);

  const handleClose = useCallback(() => {
    if (isLoading) return;

    postEdit.onClose();
  }, [postEdit, isLoading]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const patchData = {
        body,
        images,
      };

      await axios
        .patch(`/api/posts/${post.id}`, { patchData })
        .then(() => {
          mutatePosts();

          postEdit.onClose();
          postEdit.removePostId();

          return toast.success("Edited post successfully!");
        })
        .catch(() => toast.error("Something went wrong!"));
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!postEdit.isOpen) return null;

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
      <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl  lg:h-auto">
        <div className="h-full lg:h-auto border-0 pb-14 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
          <div className="flex items-center justify-between p-4 sm:p-10 rounded-t ">
            <h3 className="text-3xl font-semibold text-white">Edit Post</h3>
            <button
              onClick={handleClose}
              className="p-1 ml-auto border-0 text-white hover:opacity-70 transition"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
          <div className="relative px-4 sm:px-10 flex-auto">
            {post && (
              <div className="border-b-[1px] border-neutral-800 px-5 py-2">
                <div className="flex flex-row gap-4">
                  <div>
                    <Avatar userId={currentUser?.id} />
                  </div>
                  <div className="w-full flex flex-wrap gap-2">
                    {images.map((item: string, i: number) => {
                      const isGif = item.endsWith(".gif");

                      return (
                        <>
                          {!isGif ? (
                            <div className="relative">
                              <Image
                                key={i}
                                src={item}
                                alt={`media-${i}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="object-cover rounded-lg border-[1px] border-neutral-600"
                                style={{ height: "auto", width: "100%" }}
                              />
                              <button
                                onClick={() =>
                                  setImages(
                                    images.filter((c: string) => c !== item)
                                  )
                                }
                                className="bg-neutral-600 absolute right-1 top-1 p-1 rounded-full"
                              >
                                <HiMiniXMark className="text-white" size={20} />
                              </button>
                            </div>
                          ) : (
                            <div
                              key={i}
                              className={`relative w-56 h-56 aspect-square rounded-lg`}
                            >
                              <Image
                                src={item}
                                alt={`media-${i}`}
                                fill
                                className="object-cover rounded-lg border-[1px] border-neutral-600"
                              />
                              <button
                                onClick={() =>
                                  setImages(
                                    images.filter((c: string) => c !== item)
                                  )
                                }
                                className="bg-neutral-600 absolute right-1 top-1 p-1 rounded-full"
                              >
                                <HiMiniXMark className="text-white" size={20} />
                              </button>
                            </div>
                          )}
                        </>
                      );
                    })}

                    <TextareaForm
                      disabled={isLoading}
                      placeholder={"What's happening?!"}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setBody(e.target.value)
                      }
                      value={body}
                    />
                    <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />

                    <div className="mt-4 flex justify-end w-full">
                      <Button
                        label="Post"
                        disabled={isLoading || !body}
                        onClick={onSubmit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditModal;
