import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, { FC, useCallback, useMemo } from "react";
import Avatar from "../avatar";
import Image from "next/image";

interface Props {
  data: Record<string, any>;
}

const CommentItem: FC<Props> = ({ data }) => {
  const createdAt = useMemo(() => {
    if (!data.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);
  
  console.log(data);

  return (
    <div
      className="border-b-[1px] border-neutral-800 p-2 md:p-5 cursor-pointer hover:bg-neutral-900
    transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user?.id} />
        <div>
          <div className="flex flex-row items-start gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {data.user?.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1 whitespace-pre">{data.body}</div>
          <div className="w-full flex flex-wrap mt-2 gap-3">
            {Array.isArray(data.images) && (
              <>
                {data.images.map((item: string, i: number) => {
                  const isGif = item.endsWith(".gif");

                  return (
                    <>
                      {!isGif ? (
                        <Image
                          src={item}
                          alt={`media-${i}`}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="object-cover rounded-lg border-[1px] border-neutral-600"
                          style={{ height: "auto", width: "100%" }}
                        />
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
                        </div>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
