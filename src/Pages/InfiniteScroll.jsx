import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../API/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const InfiniteScroll = () => {

    const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 10 ? allPages.length + 1 : undefined // for next page data
        }
    })
    console.log(data)

    // WE CAN USE THIS OR WE CAN DIRECTLY WORK WITH react-intersection-observer (OPTIONAL)

    // const handleScroll = () => {
    //     const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
    //     if (bottom && hasNextPage) {
    //         fetchNextPage();
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [hasNextPage])

    const { ref, inView } = useInView({ // it automatically true inView when user reached at the bottom
        threshold: 1
    })
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView, hasNextPage])


    if (status === "loading") return <p>Loading...</p>;
    if (status === "error") return <p>Error fetching data</p>


    return <>
        <h1>Infinite Scroll</h1>
        {data?.pages?.map((page, index) => { // it have multiple pages array
            return <>
                <ul key={index}>
                    {page.map((user) => { // now the actual page data
                        return <>
                            <li className="p-2 border-gray-500 border-1 my-2" key={user.id}>
                                <p>{user.login}</p>
                                <img src={user.avatar_url} alt={user.login} width={50} />
                            </li>
                        </>
                    })}
                </ul>
            </>
        })}
        <div className="text-center p-2" ref={ref}>
            {isFetchingNextPage ? "loading more..."
                : hasNextPage ? "Scroll down to load more"
                    : "no more users"}
        </div>
    </>
}

export default InfiniteScroll;