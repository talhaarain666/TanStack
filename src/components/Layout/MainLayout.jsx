import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {

    return <>
        <Header />
        <main className="p-4">
            <Outlet />
        </main>
        <Footer />
    </>

}

export default MainLayout;