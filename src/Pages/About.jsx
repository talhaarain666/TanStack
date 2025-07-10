import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../API/api";

const About = () => {

  // const getPosts =async () => {
  //   try {
  //     const res = await fetchPosts();

  //     res.status === 200 ? res.data : []
  //   } catch (error) {
  //     return [];
  //   }


  // }

  // Use Query:   To fetch data (minimum 2 parameters) 1st (key): update on re render, 2nd (function) on load function
  const {data} = useQuery({
    queryKey: ["posts"], //like useState
    queryFn: getPosts //like useEffect
  })

  return (
    <>
      <p>
        About
      </p>
    </>
  )
};

export default About;