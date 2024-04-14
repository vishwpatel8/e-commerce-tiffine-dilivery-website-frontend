// import {
//     useGetMyRestaurantOrders,
//   } from "@/api/MyRestaurantApi";
//   import OrderItemCard from "@/components/OrderItemCard";
//   import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateMyTiffineService, useGetMyTiffineService, useUpdateMyTiffineService } from "@/api/MyTiffineServiceApi";
import ManageTiffineServiceForm from "@/forms/manage-tiffineService-form/ManageTiffineServiceForm";

//     const { orders } = useGetMyRestaurantOrders();

//     return (
//       <Tabs defaultValue="orders">
//         <TabsList>
//           <TabsTrigger value="orders">Orders</TabsTrigger>
//           <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
//         </TabsList>
//         <TabsContent
//           value="orders"
//           className="space-y-5 bg-gray-50 p-10 rounded-lg"
//         >
//           <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
//           {orders?.map((order) => (
//             <OrderItemCard order={order} />
//           ))}
//         </TabsContent>
//         <TabsContent value="manage-restaurant">
//             onSave={isEditing ? updateRestaurant : createRestaurant}
//         </TabsContent>
//       </Tabs>
//     );
//   };

const ManageTiffineServicePage = () => {
  const { createTiffineService, isLoading: isCreateLoading } =
    useCreateMyTiffineService();
    const { tiffineService } = useGetMyTiffineService();
        const { updateTiffineService, isLoading: isUpdateLoading } = 
        useUpdateMyTiffineService();
            const isEditing = !!tiffineService;


  return (<ManageTiffineServiceForm 
    tiffineService={tiffineService} 
    onSave={isEditing? updateTiffineService : createTiffineService} 
    isLoading={isCreateLoading || isUpdateLoading} />
  );
};

export default ManageTiffineServicePage;