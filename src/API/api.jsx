export const getPosts = async () => {
    const res = await api.get("/posts");
    return res.status === 200 ? res.data : []



}