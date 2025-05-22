



import {Breadcrumbs, BreadcrumbItem} from "@heroui/breadcrumbs";
import React from "react";




interface Item {
    title: string,
    href?: string
}

interface BreadCrumbProps {
    items: Item[];
}

const MyBreadCrumbs: React.FC<BreadCrumbProps> = ({
    items = [],
}) => {



    return (

        <Breadcrumbs variant="solid">
            <BreadcrumbItem href="/">Anasayfa</BreadcrumbItem>
            {items.map((item, index) => (
                <BreadcrumbItem key={index + 1} href={item.href}>{item.title}</BreadcrumbItem>
            ))}
        </Breadcrumbs>

    )


}


export default MyBreadCrumbs