import { GetAllProductAPI, getproductBySearch } from "@/app/services/apis/admin/products";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
     if(searchQuery==""){
      setSearchHistory(JSON.parse(storedHistory));
     }
      else{
        Filterproducts()
      }  
      
    }
  }, []);
  


   const Filterproducts = async () => {
    try {
      const response = await getproductBySearch(searchQuery);
      if (response?.status === 200) {
        
        setSearchHistory(response?.data?.products.map((product: any) => product.productName));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== "") {
      performSearch(trimmedQuery);
      updateSearchHistory(trimmedQuery);
    }
  };

  const performSearch = (query: string) => {
    router.replace(`/dashboard/search?query=${encodeURIComponent(query)}`);
  };

  const updateSearchHistory = (query: string) => {
    const updatedHistory = [
      query,
      ...searchHistory.filter((item) => item !== query),
    ];
    setSearchHistory(updatedHistory.slice(0, 5)); // Limit to 5 recent searches
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(updatedHistory.slice(0, 5))
    );
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  const handleDropdownItemClick = (query: string) => {
    setSearchQuery(query);
    performSearch(query);
    setShowDropdown(false);
  };
  useEffect(() => {
    if(searchQuery!==""){

      performSearch(searchQuery);
    }
  }, [searchQuery]);
  useEffect(()=>{
     if(searchQuery!==""){
      Filterproducts()
     }else{
      const storedHistory = localStorage.getItem("searchHistory");
      if (storedHistory) {
      
        setSearchHistory(JSON.parse(storedHistory));
       }
     }
  },[searchQuery])

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="relative hidden sm:inline-block w-full sm:max-w-sm"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={handleInputFocus}
          onBlur={handleInputBlur}
          className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 text-gray-900 w-full"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <svg
            className="fill-current text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
          </svg>
        </button>
      </form>
      {showDropdown && searchHistory.length > 0 && (
        <div className="absolute z-[2000] bg-white w-full border border-gray-200 rounded-md my-2 p-2">
          <h1 className="my-1 font-semibold">Recent Searches</h1>
          {searchHistory.map((query: string, index: number) => (
            <div
              key={index}
              onClick={() => handleDropdownItemClick(query)}
              className="cursor-pointer flex items-center p-1 gap-2 my-1 hover:bg-gray-200 hover:rounded-md"
            >
              <svg
                className="fill-current text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
              </svg>
              {query}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
