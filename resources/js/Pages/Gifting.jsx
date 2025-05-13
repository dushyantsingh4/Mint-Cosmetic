import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
export default function Gifting(){
    return (
        <Layout>
            <Head title={"Gifting"} />
            <div className=" pt-16 lg:pt-28 mb-6 conatiner mx-auto px-6">
                <div className="bg-white py-4">
                <h1 className="text-5xl pb-4 text-slate-700 text-center font-yellowtail">Coming Soon...</h1>
                <div className="flex justify-center items-center">
                    <img src={`/storage/site/gifting.jpeg`} alt="gifting" className="rounded-lg shadow-md" />
                </div>
                </div>
            </div>
        </Layout>
    )
}