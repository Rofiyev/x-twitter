import { ChangeEvent, useEffect, useState } from "react";
import Input from "../input";
import { useRouter } from "next/router";
import useDebounce from "@/hooks/useDebounce";
import qs from "query-string";

const SearchBar = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce<string>(search, 500);

  useEffect(() => {
    const query: { user: string } = {
      user: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    if (url !== router.asPath) router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="p-5">
      <Input
        type="text"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
