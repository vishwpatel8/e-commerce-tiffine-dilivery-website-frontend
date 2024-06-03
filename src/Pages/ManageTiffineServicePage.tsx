import {
  useCreateMyTiffineService,
  useGetMyTiffineServiceOrders,
  useGetMyTiffineService,
  useUpdateMyTiffineService,
} from "@/api/MyTiffineServiceApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageTiffineServiceForm from "@/forms/manage-tiffineService-form/ManageTiffineServiceForm";

const ManageTiffineServicePage = () => {
  const { createTiffineService, isLoading: isCreateLoading } =
    useCreateMyTiffineService();
  const { tiffineService } = useGetMyTiffineService();
  const { updateTiffineService, isLoading: isUpdateLoading } =
    useUpdateMyTiffineService();

  const { orders } = useGetMyTiffineServiceOrders();

  const isEditing = !!tiffineService;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-tiffineService">Manage TiffineService</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-tiffineService">
      <ManageTiffineServiceForm
          tiffineService={tiffineService}
          onSave={isEditing ? updateTiffineService : createTiffineService}
          isLoading={isCreateLoading || isUpdateLoading}
        />  
      </TabsContent>
    </Tabs>
  );
};

export default ManageTiffineServicePage;