import { TiffineService } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyTiffineService = () =>{
    const { getAccessTokenSilently } = useAuth0();

    const getMyTiffineServiceRequest = async (): Promise<TiffineService>=> {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/tiffineService` , {
            method: "GET",
            headers: {
                Authorization : `Bearer ${accessToken}`
            },
        }) ;

        if(!response.ok){
            throw new Error("Failed to get Tiffine Service");
        }
        return response.json();
    };

    const { data: tiffineService, isLoading} = useQuery(
        "fetchMyTiffineService", 
        getMyTiffineServiceRequest
    );

    return { tiffineService , isLoading };
};

export const useCreateMyTiffineService = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyTiffineServiceRequest = async (
        tiffineServiceFormData: FormData
    ): Promise<TiffineService> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/tiffineService`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: tiffineServiceFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to create tiffine Service");
        }

        return response.json();
    };

    const {
        mutate: createTiffineService,
        isLoading,
        isSuccess,
        error
    } = useMutation(createMyTiffineServiceRequest);

    if (isSuccess) {
        toast.success("Tiffine Service created!");
    }

    if (error) {
        toast.error("Unable to Create Tiffine Service");
    }

    return { createTiffineService, isLoading };
};

export const useUpdateMyTiffineService = () =>{
    const { getAccessTokenSilently } = useAuth0();

    const updateTiffineServiceRequest = async(
        tiffineServiceFormData: FormData):
        Promise<TiffineService>=>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/tiffineService`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: tiffineServiceFormData,
        });

        if(!response){
            throw new Error("Failed to update tiffineService");
        }

        return response.json();
    };

    const { 
        mutate: updateTiffineService, 
        isLoading, 
        error, 
        isSuccess
    }= useMutation(updateTiffineServiceRequest);

    if(isSuccess){
        toast.success("Tiffine Service Updated");
    }

    if(error){
        toast.error("Unable to update Tiffine Service");
    }

    return {updateTiffineService, isLoading };
 };