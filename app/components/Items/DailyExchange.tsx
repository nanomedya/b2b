

import React from "react";
import DailyRate, { DailyRateSkeleton } from "./DailyRate";
import { Currencies } from "@/types";



interface DailyRateItemProps {
    items: Currencies[];
    isLoading: boolean
}

const DailyExchange: React.FC<DailyRateItemProps> = ({
    items = [],
    isLoading = true
}) => {

    return (
        <>
            <div className="flex flex-wrap w-full relative p-3">
                <div className="mb-4 flex flex-wrap justify-between items-center w-full border-b border-gray-200 pb-3">
                    <span className="text-xl text-gray-800 dark:text-white font-bold inline-block">Günlük Kur</span>
                </div>
                <div className="w-full relative bg-transparent rounded-xl shadow">
                    <div className="flex flex-wrap">
                        {
                            isLoading ? (
                                <>
                                    <DailyRateSkeleton />
                                    <DailyRateSkeleton />
                                    <DailyRateSkeleton />
                                </>
                            ) : (

                                items.map((item, index) => {
                                    return (
                                        <DailyRate item={item} key={index} />
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>

        </>
    );
}

export default DailyExchange
