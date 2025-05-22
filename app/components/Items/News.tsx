

import React from "react";
import {Skeleton} from "@heroui/skeleton";
import NewsItem from "./NewsItem";




interface Item {
    title: string,
    description: string
    image: string
}

interface NewsItemProps {
    items: Item[];
}

const News: React.FC<NewsItemProps> = ({
    items = [],
}) => {

    return (
        <>
            <div className="flex flex-wrap w-full relative p-3">
                <div className="mb-4 flex flex-wrap justify-between items-center w-full border-b border-gray-200 pb-3">
                    <span className="text-xl text-gray-800 dark:text-white font-bold inline-block">Haber & Duyuru</span>
                </div>
                <div className="w-full relative bg-white rounded-xl shadow">
                    <div className="flex flex-wrap">
                        {
                            items.map((item, index) => {
                                return (
                                    <div className="w-full" key={'c' + index}>
                                        <NewsItem item={item} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    );
}


const SkeletonItem = () => {
    return (
        <div className="flex flex-wrap flex-col gap-2 justify-center items-start p-3 mb-4">
            <Skeleton className="flex rounded-md w-full h-[120px]" />
            <Skeleton className="h-2 w-16 rounded-lg" />
            <Skeleton className="h-3 w-2/3 rounded-lg" />
            <Skeleton className="w-full rounded-lg">
                <div className="h-2 w-full rounded-lg bg-secondary-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
                <div className="h-2 w-1/2 rounded-lg bg-secondary-200"></div>
            </Skeleton>
        </div>
    )
}


const NewsSkeleton = () => {
    return (

            <div className="flex flex-wrap w-full relative p-3">
                <div className="mb-4 flex flex-wrap justify-between items-center w-full border-b border-gray-200 pb-3">
                    <span className="text-xl text-gray-800 dark:text-white font-bold inline-block">Haber & Duyuru</span>
                </div>
                <div className="w-full relative bg-white rounded-xl shadow">
                    <SkeletonItem />
                    <SkeletonItem />
                </div>
            </div>


    )
}


export default News
export { NewsSkeleton }