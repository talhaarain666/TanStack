import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../API/api";
import { NavLink } from "react-router-dom";

const About = () => {



  // Use Query:   To fetch data (minimum 2 parameters) 1st (key): update on re render, 2nd (function) on load function
  // returning data, loading, error hai ya nahi, error kia hai
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"], //like useState
    queryFn: fetchPosts, //like useEffect
    // gcTime:1000 // garbage collection means cache time (By default it is 5 minutes) so it will save data in cache till 5 minutes
  })

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error:{error.message || "Something went wrong"}</p>

  return (
    <>
      <div>
        <ul className="section-accordion">
          {data?.map((curElem) => {
            const { id, title, body } = curElem;
            return (
              <li key={id}>
                <NavLink to={`/rq/${id}`}>
                  <p>{id}</p>
                  <p>{title}</p>
                  <p>{body}</p>
                </NavLink>
                <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
                <button onClick={() => updateMutation.mutate(id)}>Update</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  )
};

export default About;