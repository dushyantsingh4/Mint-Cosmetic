import Layout from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/react";

export default function ThankYou() {
    const { message } = usePage().props;

    return (
        <Layout>
            <Head title="Thank You" />
            <div className="text-center mt-32">
                <h1 className="text-3xl font-bold text-green-600">Thank You!</h1>
                <p className="text-gray-700 mt-4">{message}</p>
            </div>
        </Layout>
    );
}
