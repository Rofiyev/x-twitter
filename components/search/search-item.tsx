import { FC, useCallback, useMemo } from "react";
import Avatar from "../avatar";
import { useRouter } from "next/router";
import { format } from "date-fns";

interface Props {
  data: Record<string, any>;
}

const SearchItem: FC<Props> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback(() => {
    router.push(`/users/${data.id}`);
  }, [data.id, router]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return format(new Date(data?.createdAt), "MMMM yyyy");
  }, [data.createdAt]);

  return (
    <div
      onClick={goToUser}
      className="flex flex-row hover:bg-neutral-900 cursor-pointer transition items-center gap-4 p-2 rounded-md"
    >
      <Avatar userId={data.id} />
      <div className="flex flex-col">
        <div className="flex gap-2">
          <p className="text-white font-semibold text-sm">{data.name}</p>
          <p className="text-neutral-500 text-sm">{createdAt}</p>
        </div>
        <p className="text-neutral-400 text-sm font-medium">@{data.username}</p>
      </div>
    </div>
  );
};

export default SearchItem;
