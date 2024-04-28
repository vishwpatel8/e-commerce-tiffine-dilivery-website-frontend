import MenuItemComponent from "@/components/MenuItemComponent";
import OrderSummary from "@/components/OrderSummary";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useGetTiffineService } from "@/api/TiffineServiceApi";
import { useParams } from "react-router-dom";
import TiffineServiceInfo from "@/components/TiffineServiceInfo";
import { MenuItem as MenuItemType } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
};

const DetailPage = () => {
    const { tiffineServiceId } = useParams();
    const { tiffineService, isLoading } = useGetTiffineService(tiffineServiceId);
    const { createCheckoutSession, isLoading: isCheckoutLoading } =
        useCreateCheckoutSession();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${tiffineServiceId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find(
                (cartItem) => cartItem._id === menuItem._id
            );
            let updatedCartItems;


            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    },
                ];
            }

            sessionStorage.setItem(
                `cartItems-${tiffineServiceId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        }
        );
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            );

            sessionStorage.setItem(
                `cartItems-${tiffineServiceId}`,
                JSON.stringify(updatedCartItems)
            );

            return updatedCartItems;
        });
    };

    const onCheckout = async (userFormData: UserFormData) => {
        if (!tiffineService) {
          return;
        }

        const checkoutData = {
            cartItems: cartItems.map((cartItem) => ({
                menuItemId: cartItem._id,
                name: cartItem.name,
                quantity: cartItem.quantity.toString(),
            })),
            tiffineServiceId: tiffineService._id,
              deliveryDetails: {
                    name: userFormData.name,
                    addressLine1: userFormData.addressLine1,
                    city: userFormData.city,
                    country: userFormData.country,
                    email: userFormData.email as string,
                  },
        };

            const data = await createCheckoutSession(checkoutData);
            window.location.href = data.url;
    };


    if (isLoading || !tiffineService) {
        return "Loading...";
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={tiffineService.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-12">
                <div className="flex flex-col gap-4">
                    <TiffineServiceInfo tiffineService={tiffineService} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {tiffineService.menuItems.map((menuItem) => (
                        <MenuItemComponent
                            menuItem={menuItem}
                            addToCart={() => addToCart(menuItem)}
                        />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary
                            tiffineService={tiffineService}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                            isLoading={isCheckoutLoading}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;