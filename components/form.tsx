import { ChangeEvent, FC, useCallback, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "./button";
import Avatar from "./avatar";

interface Props {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: FC<Props> = ({ placeholder, isComment, postId }) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts(postId as string);
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url: string = isComment
        ? `/api/comments?postId=${postId}`
        : "/api/posts";

      if (body) {
        await axios.post(url, { body });
        toast.success(
          isComment
            ? "Post comment submitted successfully!"
            : "Post Created Successfully!"
        );

        setBody("");
        mutatePosts();
        mutatePost();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, mutatePost, isComment, postId]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <div className="flex flex-row gap-4">
        <div>
          <Avatar userId={currentUser?.id} />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            placeholder={placeholder}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setBody(e.target.value)
            }
            value={body}
            className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
          />
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
          <div className="mt-4 flex flex-row justify-end">
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
