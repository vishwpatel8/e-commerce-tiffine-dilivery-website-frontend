import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {
    const { user, logout } = useAuth0();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex item-center px-3 font-bold hover:text-[#0E592C] gap-2">
                <CircleUserRound className="text-[#0E592C]  " />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem>
                    <Link to="/manage-tiffineService" className="font-bold hover:text-[#0E592C]" >Manage Tiffine Service</Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Link to="/user-profile" className="font-bold hover:text-[#0E592C]" >User Profile</Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Button onClick={() => logout()} className="flex flex-1 font-bold bg-[#0E592C]">Log Out</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UsernameMenu;