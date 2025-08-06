import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// With Pagination
export const fetchPosts = async (page) => {
  try {
    const res = await api.get(`/posts?_start=${page}&_limit=3`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};
// Without Pagination
// export const fetchPosts = async () => {
//   try {
//     const res = await api.get(`/posts?_start=1&_limit=3`);
//     return res.status === 200 ? res.data : [];
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchPostDetails = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, { title: "I have updated" });
};

export const fetchUsers = async ({pageParam = 1}) => { // when ever we call api in useInfiniteQuery it give pageParam (page number) bydefault
  try {
    const res = await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
};

