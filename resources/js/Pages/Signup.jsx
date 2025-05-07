import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import SignUpForm from "@/Components/SignUpPgComponents/SignUpForm";

export default function SignUp(){
    return (
        <>
            <Layout>
                <Head title="Sign Up" />
                <section className="pt-6">
                    <div className="w-1/2 mx-auto mt-28 mb-4 lg:mb-8 bg-white px-4 lg:px-8 py-4 lg:py-8 shadow">
                        <h1 className="text-xl text-center">Sign Up for new Account</h1>
                        <SignUpForm />
                        <div className="text-priDark mt-8 text-sm">
                        <Link href={route('login')} >Already Have a Account</Link>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}