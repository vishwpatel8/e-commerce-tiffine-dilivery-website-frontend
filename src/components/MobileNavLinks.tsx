import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
    const { logout } = useAuth0();
    return (
        <>
            <Link
                to="/order-status"
                className="flex bg-white items-center font-bold hover:text-[#0E592C] "
            >
                Order Status
            </Link>
            <Link
                to="/manage-tiffineService"
                className="flex bg-white items-center font-bold hover:text-[#0E592C] "
            >
                My TiffineService
            </Link>
            <Link 
            to="/user-profile"
                className="flex bg-white items-center font-bold hover:text-[#0E592C] "
                >
                User Profile
            </Link>
            <Button onClick={() => logout()}
                className="flex items-center px-3 font-bold hover:bg-[#dde4e0]"
                >
                Log Out
            </Button>
        </>
    );
};

export default MobileNavLinks;