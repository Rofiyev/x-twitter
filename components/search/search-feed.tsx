import useSearch from "@/hooks/useSearch";
import { useRouter } from "next/router";
import SearchItem from "./search-item";
import { ClipLoader } from "react-spinners";
import useUsers from "@/hooks/useUsers";

const SearchFeed = () => {
  const router = useRouter();
  const { data: fetchedUsers = [] } = useUsers();
  const { data: searchUsers = [], isLoading } = useSearch(
    router.query.user as string
  );

  if (isLoading) {
    return (
      <div className="text-center text-white">
        <ClipLoader
          color={"#fff"}
          loading={isLoading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="px-1 md:px-4">
      {searchUsers.length
        ? searchUsers.map((user: Record<string, any>) => (
            <SearchItem key={user.id} data={user} />
          ))
        : fetchedUsers
            .reverse()
            .map((user: Record<string, any>) => (
              <SearchItem key={user.id} data={user} />
            ))}
    </div>
  );
};

export default SearchFeed;
