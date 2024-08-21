import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import Avatar from "../avatar";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (!fetchedNotifications.length)
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No Notifications
      </div>
    );

  const createdAt = (date: Date) => formatDistanceToNowStrict(new Date(date));

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
        >
          <Image
            width={45}
            height={45}
            src="/images/x-logo.png"
            style={{ objectFit: "cover" }}
            alt="Logo"
          />
          <div>
            <span className="text-neutral-500">
              {createdAt(notification.createdAt)}
            </span>
            <p className="text-white">{notification.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
