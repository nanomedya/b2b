import { Currencies } from "@/types";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Skeleton} from "@heroui/skeleton";

import moment from "moment";
import "moment/locale/tr"



const DailyRate = ({ item }: { item: Currencies }) => {

  return (
    <Card shadow="none" className="py-4 mb-6" fullWidth>
      <CardHeader className="pb-0 pt-2 px-4 flex items-start justify-center lg:justify-start gap-4">
        <div className="flex flex-wrap lg:flex-col w-full justify-center lg:justify-start">
          <div className="w-full flex gap-2 justify-center lg:justify-start items-center mb-3">
            <h4 className="font-normal text-3xl text-white size-14 bg-warning rounded-full flex justify-center items-center">
              {item.currency}
            </h4>
            <h4 className="font-bold text-3xl">{item.value}</h4>
          </div>

          <small className="text-default-500">
            Son güncellenme: {moment(item.updated_at).fromNow()}
          </small>
        </div>
        <div className="size-36 lg:size-48 bg-warning/10 rounded-full absolute right-[-50px] bottom-[-55px]"></div>
      </CardHeader>
    </Card>
  );
}

const DailyRateSkeleton = () => {

  return (
    <Card shadow="none" className="py-4 mb-6" fullWidth>
      <CardHeader className="pb-0 pt-2 px-4 flex items-start justify-center lg:justify-start gap-4">
        <div className="flex flex-wrap lg:flex-col w-full justify-center lg:justify-start">
          <div className="w-full flex gap-2 justify-center lg:justify-start items-center mb-3">
            <>
              <Skeleton className="w-14 h-14 rounded-full bg-warning" />
              <Skeleton className="w-24 h-8 rounded bg-default-300" />
            </>
          </div>
          <Skeleton className="w-40 h-4 rounded bg-default-300" />
        </div>
        <div className="size-36 lg:size-48 bg-warning/10 rounded-full absolute right-[-50px] bottom-[-55px]"></div>
      </CardHeader>
    </Card>
  );
}

export default DailyRate
export {DailyRateSkeleton}