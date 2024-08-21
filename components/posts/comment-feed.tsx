import { FC } from "react";
import CommentItem from "./comment-item";

interface Props {
  comments: Record<string, any>[];
}

const CommentFeed: FC<Props> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
