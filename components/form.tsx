"use client";

import { ChangeEvent, FC, useCallback, useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import Button from "./button";
import Avatar from "./avatar";
import { usePostModal } from "@/hooks/usePostModal";
import { MdEmojiEmotions, MdGifBox } from "react-icons/md";
import Emoji from "./emoji-picker";
import GifPicker from "./gif-picker";
import { HiMiniXMark } from "react-icons/hi2";
import { CiImageOn } from "react-icons/ci";
import TextareaForm from "./textarea-form";
import ImageUploadForm from "./image-upload-form";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface Props {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  value?: string;
}

const Form: FC<Props> = ({ placeholder, isComment, postId, value }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);
  const { mutate: mutatePost } = usePost(postId as string);
  const postModal = usePostModal();

  const [body, setBody] = useState<string>(value ? value : "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gifsValue, setGifsValue] = useState<string>("");
  const [postImage, setPostImage] = useState<string>("");

  const setBodyEmoji = useCallback(
    (emoji: string) => setBody((prev) => `${prev}${emoji}`),
    []
  );

  const setGif = useCallback((value: string) => {
    setGifsValue(value);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const images = [];

      if (postImage) images.push(postImage);
      if (gifsValue) images.push(gifsValue);

      const data = {
        body: body.replace(/\r\n/g, "\n"),
        images,
      };

      const url: string = isComment
        ? `/api/comments?postId=${postId}`
        : "/api/posts";

      if (body || images.length) {
        await axios.post(url, data);
        toast.success(
          isComment
            ? "Post comment submitted successfully!"
            : "Post Created Successfully!"
        );

        postModal.onClose();
        mutatePosts();
        mutatePost();
        setPostImage("");
        setGifsValue("");
        return setBody("");
      }
    } catch (error: any) {
      toast.error(
        "There was an error! The image you are sending must not exceed 1mb!"
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    body,
    mutatePosts,
    mutatePost,
    isComment,
    postId,
    postModal,
    gifsValue,
    postImage,
  ]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <div>
          <Avatar userId={currentUser?.id} />
        </div>
        <div className="w-full flex flex-wrap gap-2">
          {postImage && (
            <div className="relative min-h-56 w-full">
              <>
                <Image
                  src={postImage}
                  alt="Image"
                  className="object-cover"
                  fill
                />
                <button
                  onClick={() => setPostImage("")}
                  className="bg-neutral-600 absolute right-1 top-1 p-1 rounded-full"
                >
                  <HiMiniXMark className="text-white" size={20} />
                </button>
              </>
            </div>
          )}

          {gifsValue && (
            <div className="relative h-52 w-52">
              <>
                <Image
                  src={gifsValue}
                  alt="Image"
                  className="object-cover"
                  fill
                />
                <button
                  onClick={() => setGif("")}
                  className="bg-neutral-600 absolute right-1 top-1 p-1 rounded-full"
                >
                  <HiMiniXMark className="text-white" size={20} />
                </button>
              </>
            </div>
          )}

          <TextareaForm
            disabled={isLoading}
            placeholder={placeholder}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setBody(e.target.value)
            }
            value={body}
          />
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
          <div className="mt-4 flex justify-between w-full relative">
            <div className="relative flex gap-1 flex-1 h-full">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton>
                    <MdEmojiEmotions
                      className="text-sky-500 cursor-pointer hover:text-sky-400 transition"
                      size={24}
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute -left-10 z-[999999999] w-56 origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  Emoji
                  <div className="py-1">
                    <MenuItem>
                      <Emoji setBodyEmoji={setBodyEmoji} />
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              <ImageUploadForm
                disabled={isLoading}
                onChange={(image) => setPostImage(image)}
              >
                <CiImageOn
                  size={24}
                  className="text-sky-500 cursor-pointer hover:text-sky-400 transition"
                />
              </ImageUploadForm>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton>
                    <MdGifBox
                      className="text-sky-500 cursor-pointer hover:text-sky-400 transition"
                      size={24}
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute -left-20 z-[999999999] w-56 origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <GifPicker setGif={setGif} />
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>

            <Button
              label="Post"
              disabled={isLoading || !body}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
