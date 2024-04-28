import { SearchState } from "@/Pages/SearchPage";
import { TiffineService, TiffineServiceSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetTiffineService = (tiffineServiceId?: string) => {
  const getTiffineServiceByIdRequest = async (): Promise<TiffineService> => {
    const response = await fetch(
      `${API_BASE_URL}/api/tiffineService/${tiffineServiceId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get tiffineService");
    }

    return response.json();
  };

  const { data: tiffineService, isLoading } = useQuery(
    "fetchTiffineService",
    getTiffineServiceByIdRequest,
    {
      enabled: !!tiffineServiceId,
    }
  );

  return { tiffineService, isLoading };
};


export const useSearchTiffineServices = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<TiffineServiceSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/tiffineService/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get tiffineService");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchTiffineServices", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};