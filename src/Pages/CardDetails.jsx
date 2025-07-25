import { useQuery } from "@tanstack/react-query"
import { fetchPostDetails } from "../API/api"
import { NavLink, useParams } from "react-router-dom"

export default function CardDetails() {

    const { id } = useParams();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts", id], // when posts or id change the fuction fetchPostDetails will call
        queryFn: () => fetchPostDetails(id),
    })

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error:{error.message || "Something went wrong"}</p>

    return <>
        <NavLink to="/cards">
            <button className="p-2 bg-gray-300 cursor-pointer">Go back</button>
        </NavLink >
        <div className="flex flex-col gap-6 items-center">

        <h1 className="text-3xl">Card details</h1>

        <div className="flex flex-col gap-4 bg-gray-100 p-8 rounded-4xl">
            <p>Id: {data?.id}</p>
            <p className="text-2xl">Title: {data?.title}</p>
            <p className="text-lg">Body: {data?.body}</p>


        </div>
        </div>
    </>
}