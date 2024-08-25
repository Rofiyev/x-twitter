import { FC, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useLoginModal } from "@/hooks/useLoginModal";
import useLike from "@/hooks/useLike";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "../avatar";
import Dropdown from "../dropdown";

interface Props {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: FC<Props> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const { hasLike, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [data.user.id, router]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [data.id, router]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (!currentUser) return loginModal.onOpen();

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data.createdAt]);

  const LikeIcon: IconType = hasLike ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-2 md:p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <div className="">
          <Avatar userId={data?.user.id} />
        </div>
        <div className="w-full">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex justify-between gap-2 items-center">
              <p
                onClick={goToUser}
                className="text-white font-semibold cursor-pointer hover:underline"
              >
                {data?.user?.name}
              </p>
              <span
                onClick={goToUser}
                className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              >
                @{data?.user.username}
              </span>
              <span className="text-neutral-500 text-sm">{createdAt}</span>
            </div>
            {currentUser?.id === data.userId && <Dropdown postId={data.id} />}
          </div>
          <p className="text-white mt-1">{data?.body}</p>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p className="mt-1">{data?.comment?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-600 group"
            >
              <LikeIcon
                size={20}
                className={
                  hasLike
                    ? "text-red-600"
                    : "text-neutral-500 group-hover:text-red-600"
                }
              />
              <p className="mt-1">{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
