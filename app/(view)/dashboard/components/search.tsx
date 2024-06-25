import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Search = () => {
    const router=useRouter()
    const [searchQuery,setSearchQuery]=useState("")
    const [change,setchange]=useState(false)
       
    
    const handleSearch = (event:any) => {
        event.preventDefault();
        // setchange(true)     
        performSearch();
    };
    

    const performSearch = () => {
        
            const search =searchQuery 
            let recentsearches = [];
            const existingRecentSearches = localStorage.getItem("recentSearches");
            if (existingRecentSearches) {
                recentsearches = JSON.parse(existingRecentSearches);
                const find=recentsearches.filter((el:string)=>el===search)
                if(find?.length){
                    recentsearches.push(search);
                    if (recentsearches.length > 10) {
                        recentsearches = recentsearches.slice(recentsearches.length - 10);
                    }
                } else {
                    recentsearches = [search];
                }
                }
               
                
             localStorage.setItem("recentSearches", JSON.stringify(recentsearches));
            
            if (searchQuery.trim()) {
                router.replace(`/dashboard/search?query=${encodeURIComponent(searchQuery)}`);
            }
        
    };
    

    useEffect(() => {
        performSearch();
      
    }, [searchQuery]);

  return (
    <div>  <form onSubmit={handleSearch} className="relative hidden sm:inline-block w-full sm:max-w-sm">
    <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 text-gray-900 w-full"
        placeholder="Search..."
    />
    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <svg
            className="fill-current text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z"
            />
        </svg>
    </button>
</form></div>
  )
}

export default Search