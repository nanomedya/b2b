"use client"

import GuestLayout from "@/app/components/Layouts/GuestLayout";
import NavbarWrapper from "@/app/components/Items/NavbarWrapper";

import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { useAuth } from "@/context/AuthContext";
import PageLoader from "@/app/components/Items/PageLoader";
import MyBreadCrumbs from "@/app/components/Items/MyBreadCrumbs";
import StoriesBox from "@/app/components/Items/StoriesBox";

const Help = () => {
    const { user, loading } = useAuth();

    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    if (loading) {
        return (
            <div><PageLoader /></div>
        )
    }

    return (
        <GuestLayout>
            <NavbarWrapper />


            <div className="w-full relative py-3 mx-auto bg-[#ffefd4] min-h-[800px]">
                <div className="relative w-full h-full my-10">
                    <div className="mx-auto container">

                        <MyBreadCrumbs items={[{ title: "Normal Sayfa" }]} />

                        <div className="mt-4"><StoriesBox /></div>


                        <Card className="mt-5 mx-auto max-w-5xl">
                            <CardHeader className="text-3xl font-semibold px-3">Gizlilik Sözleşmesi</CardHeader>
                            <CardBody>
                                <div className="space-y-4">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus dapibus pretium. Morbi varius massa nunc, vehicula mollis nisl congue vitae. Donec maximus magna nisi, ac lobortis mauris lacinia at. Pellentesque dignissim laoreet orci dignissim egestas. Praesent pharetra, nunc eget fermentum mollis, leo augue gravida ante, nec suscipit sapien eros sed nisl. Vivamus ligula odio, dapibus pulvinar sagittis et, convallis quis elit. Vestibulum tincidunt justo in magna mollis gravida. Nullam est urna, congue eu vestibulum id, fermentum vitae purus. Cras molestie interdum elementum.</p>
                                    <p>Vivamus tortor purus, tempor ut congue non, pretium in ligula. In hac habitasse platea dictumst. Aliquam ut turpis at velit consequat placerat id in lorem. Pellentesque finibus luctus ex, tincidunt finibus ipsum laoreet eget. Maecenas eget commodo enim. Sed rhoncus urna venenatis felis laoreet volutpat. In at orci ut mauris facilisis commodo. Suspendisse maximus, dolor ultricies facilisis vestibulum, libero nulla ultrices elit, et consequat metus risus nec est. Mauris eget aliquet nulla, eget posuere ligula. Cras congue pharetra varius. In pulvinar condimentum mauris, quis maximus nulla pellentesque id.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus dapibus pretium. Morbi varius massa nunc, vehicula mollis nisl congue vitae. Donec maximus magna nisi, ac lobortis mauris lacinia at. Pellentesque dignissim laoreet orci dignissim egestas. Praesent pharetra, nunc eget fermentum mollis, leo augue gravida ante, nec suscipit sapien eros sed nisl. Vivamus ligula odio, dapibus pulvinar sagittis et, convallis quis elit. Vestibulum tincidunt justo in magna mollis gravida. Nullam est urna, congue eu vestibulum id, fermentum vitae purus. Cras molestie interdum elementum.</p>
                                    <p>Vivamus tortor purus, tempor ut congue non, pretium in ligula. In hac habitasse platea dictumst. Aliquam ut turpis at velit consequat placerat id in lorem. Pellentesque finibus luctus ex, tincidunt finibus ipsum laoreet eget. Maecenas eget commodo enim. Sed rhoncus urna venenatis felis laoreet volutpat. In at orci ut mauris facilisis commodo. Suspendisse maximus, dolor ultricies facilisis vestibulum, libero nulla ultrices elit, et consequat metus risus nec est. Mauris eget aliquet nulla, eget posuere ligula. Cras congue pharetra varius. In pulvinar condimentum mauris, quis maximus nulla pellentesque id.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus dapibus pretium. Morbi varius massa nunc, vehicula mollis nisl congue vitae. Donec maximus magna nisi, ac lobortis mauris lacinia at. Pellentesque dignissim laoreet orci dignissim egestas. Praesent pharetra, nunc eget fermentum mollis, leo augue gravida ante, nec suscipit sapien eros sed nisl. Vivamus ligula odio, dapibus pulvinar sagittis et, convallis quis elit. Vestibulum tincidunt justo in magna mollis gravida. Nullam est urna, congue eu vestibulum id, fermentum vitae purus. Cras molestie interdum elementum.</p>
                                    <p>Vivamus tortor purus, tempor ut congue non, pretium in ligula. In hac habitasse platea dictumst. Aliquam ut turpis at velit consequat placerat id in lorem. Pellentesque finibus luctus ex, tincidunt finibus ipsum laoreet eget. Maecenas eget commodo enim. Sed rhoncus urna venenatis felis laoreet volutpat. In at orci ut mauris facilisis commodo. Suspendisse maximus, dolor ultricies facilisis vestibulum, libero nulla ultrices elit, et consequat metus risus nec est. Mauris eget aliquet nulla, eget posuere ligula. Cras congue pharetra varius. In pulvinar condimentum mauris, quis maximus nulla pellentesque id.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus dapibus pretium. Morbi varius massa nunc, vehicula mollis nisl congue vitae. Donec maximus magna nisi, ac lobortis mauris lacinia at. Pellentesque dignissim laoreet orci dignissim egestas. Praesent pharetra, nunc eget fermentum mollis, leo augue gravida ante, nec suscipit sapien eros sed nisl. Vivamus ligula odio, dapibus pulvinar sagittis et, convallis quis elit. Vestibulum tincidunt justo in magna mollis gravida. Nullam est urna, congue eu vestibulum id, fermentum vitae purus. Cras molestie interdum elementum.</p>
                                    <p>Vivamus tortor purus, tempor ut congue non, pretium in ligula. In hac habitasse platea dictumst. Aliquam ut turpis at velit consequat placerat id in lorem. Pellentesque finibus luctus ex, tincidunt finibus ipsum laoreet eget. Maecenas eget commodo enim. Sed rhoncus urna venenatis felis laoreet volutpat. In at orci ut mauris facilisis commodo. Suspendisse maximus, dolor ultricies facilisis vestibulum, libero nulla ultrices elit, et consequat metus risus nec est. Mauris eget aliquet nulla, eget posuere ligula. Cras congue pharetra varius. In pulvinar condimentum mauris, quis maximus nulla pellentesque id.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus dapibus pretium. Morbi varius massa nunc, vehicula mollis nisl congue vitae. Donec maximus magna nisi, ac lobortis mauris lacinia at. Pellentesque dignissim laoreet orci dignissim egestas. Praesent pharetra, nunc eget fermentum mollis, leo augue gravida ante, nec suscipit sapien eros sed nisl. Vivamus ligula odio, dapibus pulvinar sagittis et, convallis quis elit. Vestibulum tincidunt justo in magna mollis gravida. Nullam est urna, congue eu vestibulum id, fermentum vitae purus. Cras molestie interdum elementum.</p>
                                    <p>Vivamus tortor purus, tempor ut congue non, pretium in ligula. In hac habitasse platea dictumst. Aliquam ut turpis at velit consequat placerat id in lorem. Pellentesque finibus luctus ex, tincidunt finibus ipsum laoreet eget. Maecenas eget commodo enim. Sed rhoncus urna venenatis felis laoreet volutpat. In at orci ut mauris facilisis commodo. Suspendisse maximus, dolor ultricies facilisis vestibulum, libero nulla ultrices elit, et consequat metus risus nec est. Mauris eget aliquet nulla, eget posuere ligula. Cras congue pharetra varius. In pulvinar condimentum mauris, quis maximus nulla pellentesque id.</p>
                                </div>
                            </CardBody>
                        </Card>



                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Help;
