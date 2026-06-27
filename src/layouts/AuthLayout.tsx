import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="pt-[78px]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
