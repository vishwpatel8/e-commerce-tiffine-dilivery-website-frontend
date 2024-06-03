import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-[#0E592C] " />
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ?
                        (<span className="flex items-center font-bold gap-2">
                            <CircleUserRound className="text-[#0E592C}" />
                            {user?.email}
                        </span>) : (<span>Welcome to AAHARPETIKA.com</span>
                        )}
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ?
                        (<MobileNavLinks />
                        ) : (
                            <Button
                                onClick={() => loginWithRedirect()}
                                className="flex-1 font-bold bg-[#0E592C] ">
                                Log In
                            </Button>
                        )}

                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav;