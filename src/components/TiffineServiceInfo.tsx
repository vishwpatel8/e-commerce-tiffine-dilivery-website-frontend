import { TiffineService } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  tiffineService: TiffineService;
};

const TiffineServiceInfo = ({ tiffineService }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {tiffineService.tiffineServiceName}
        </CardTitle>
        <CardDescription>
          {tiffineService.city}, {tiffineService.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {tiffineService.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < tiffineService.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default TiffineServiceInfo;