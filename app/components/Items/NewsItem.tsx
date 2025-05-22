import {Link} from "@heroui/link";
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Image} from "@heroui/image";

interface CardItemProps {
  item: {
    title: string;
    image: string;
    description: string;
  };
}

export default function NewsItem({ item }: CardItemProps) {
  return (
    <Link href="#">
      <Card shadow="none" className="py-4">
        <CardBody className="pb-0 pt-2 px-4 flex flex-col items-start gap-2">
          <Image
            alt={item.title} 
            className="object-contain rounded-md max-w-md w-full h-full"
            src={item.image}
          />

          <div className="flex flex-col">
            <small className="text-default-500">26.09.2024</small>
            <h4 className="font-bold text-lg line-clamp-2">{item.title}</h4>
            <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
          </div>
          </CardBody>
      </Card>
    </Link>
  );
}
