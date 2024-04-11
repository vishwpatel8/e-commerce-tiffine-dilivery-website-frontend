import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
    return(
        // border-b-2 border-b-[#0E592CC7]
        <div className=" py-6 bg-[#dde4e0]">
            <div className="container mx-auto flex justify-between  items-center">
                <Link to="/" className="text-4xl font-bold tracking-tight text-[#0E592C] ">AAHAR PETIKA</Link>
                <div className="md:hidden">
                    <MobileNav />
                </div>
                <div className="hidden md:block">
                    <MainNav />
                </div>
            </div>
        </div>
    );
};

export default Header;