import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import MainLayout from './components/Layout/MainLayout';
import About from "./Pages/About";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ],
  },
]);


const App = () => {

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        {/* ReactQueryDevtools se hmen console , network tab wghera ki mostly zrorat nahi pregi */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
};

export default App;
