import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Cards = () => {

  const [pageNumber, setPageNumber] = useState(0);

  // NOTE
  // BY DEFAULT VALUES
  // gcTime: (5 minutes) , staleTime: 0 , refetchIntervalInBackground: false


  // Use Query:   To fetch data (minimum 2 parameters) 1st (key): update on re render, 2nd (function) on load function
  // returning data, loading, error hai ya nahi, error kia hai
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber], //like useState (in queryKey array if they update then query function will call)
    queryFn: () => fetchPosts(pageNumber), // agr hm function is trh se call krte hn (fetchPosts()) to is se pehle ye lgana zrori hai like this (()=>fetchPosts())
    // queryFn: fetchPosts, //like useEffect 
    // gcTime:1000 // garbage collection means cache time (By default it is 5 minutes) so it will save data in cache till 5 minutes
    // staleTime:5000 // when should get new data (fetch api after time) so that if user continously select tab again and again then api will not load until stale time
    // refetchInterval:1000 // called Polling, when we want realtime data (like in crypto, stocks website etc) it will fetch api after every second (Note: don't use staleTime with this)
    // refetchIntervalInBackground:true //  if we change tab then it will not stop calling apis frequently
    placeholderData: keepPreviousData, // if we dont want loading on pagination next and prev button, it will keep previous data until new data comes, so that loading won't appear
  })

  const queryClient = useQueryClient();

  // FOR DELETE

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id), // mutuationFn is required
    onSuccess: (data, id) => { // in data we can find details like status code etc. id of element
      queryClient.setQueryData(["posts", pageNumber], (currElem) => {   // ["posts", pageNumber] jis query key k cached data ko access krna hai wo likhna hai
        return currElem?.filter((post) => post.id !== id);

      })
    }
  })

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error:{error.message || "Something went wrong"}</p>

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <div className="bg-gray-100 p-2 rounded-2xl w-3/5 m-auto mt-4 cursor-pointer" key={id}>
              <NavLink to={`/cards/${id}`}>
                <p>{id}</p>
                <p className="text-2xl my-2">{title}</p>
                <p>{body}</p>
              </NavLink>
              <div className="flex justify-end gap-4 my-2">
                <button className="p-2 bg-green-300 cursor-pointer" onClick={() => updateMutation.mutate(id)}>Update</button>
                {/* when we want to call function that is in useMutuation */}
                <button className="p-2 bg-red-300 cursor-pointer" onClick={() => deleteMutation.mutate(id)}>Delete</button>
              </div>
            </div>
          );
        })}
        <div className="flex gap-4 items-center">
          {/* this is post number (3) thats why it is 3, otherwise it will be 1
          bcz of api , it is 3
          */}
          <button className="bg-cyan-300 p-2 cursor-pointer disabled:opacity-50" disabled={pageNumber === 0} onClick={() => setPageNumber((prev) => prev - 3)}>
            Prev
          </button>
          <h2>
            {pageNumber / 3 + 1}
          </h2>
          <button className="bg-cyan-300 p-2 cursor-pointer" onClick={() => setPageNumber((prev) => prev + 3)}>
            Next
          </button>
        </div>
      </div>
    </>
  )
};

export default Cards;