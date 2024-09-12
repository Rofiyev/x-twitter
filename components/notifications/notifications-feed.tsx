import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { formatDistanceToNowStrict } from "date-fns";

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

  console.log(fetchedNotifications);

  const createdAt = (date: Date) => formatDistanceToNowStrict(new Date(date));

  return (
    <TabGroup>
      <TabList className="w-full flex justify-evenly">
        <Tab className="data-[selected]:bg-neutral-800 rounded-sm data-[selected]:text-sky-500 data-[selected]:border-b-sky-500 border-[1px] data-[hover]: transition w-full text-white font-semibold py-2 border-transparent">
          Messages
        </Tab>
        <Tab className="data-[selected]:bg-neutral-800 rounded-sm data-[selected]:text-sky-500 data-[selected]:border-b-sky-500 border-[1px] data-[hover]: transition w-full text-white font-semibold py-2 border-transparent">
          Requests
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel as="div" className="">
          <div className="flex flex-col">
            {fetchedNotifications.map((notification: Record<string, any>) => (
              <div
                key={notification.id}
                className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
              >
                <Image
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                  src={"/images/x-logo.png"}
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
        </TabPanel>
        <TabPanel as={"div"} className="text-white p-2">
          <div className="flex justify-center w-full pt-4">
            <p>Not requests</p>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default NotificationsFeed;
