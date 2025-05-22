import {Divider} from "@heroui/divider";
import {Image} from "@heroui/image";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import Link from "next/link";

export default function CategoryItem({ item }: any) {
  return (
    <>
      <div className="relative w-40">
        <Link href={`/category/${item.id}`} passHref>
          <Card shadow="sm" radius="sm">
            <CardBody className="overflow-visible p-0 flex justify-center items-center">
              <Image
                shadow="none"
                radius="none"
                alt={item.title}
                className="object-contain mx-auto w-[120px] h-[120px] p-2"
                src={item.image}
              />
            </CardBody>
            <Divider className="mt-5" />
            <CardFooter className="text-small flex-wrap flex-col items-center justify-start py-3">
              <div className="line-clamp-2 font-semibold">{item.title}</div>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </>
  );
}
