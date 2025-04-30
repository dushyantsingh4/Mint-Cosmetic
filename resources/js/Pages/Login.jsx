import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";

export default function Login(){
    return (
        <>
            <Layout>
                <Head title="Login" />
                <section className="pt-6">
                    <div className="w-1/2 mx-auto mt-28 mb-4 lg:mb-8 bg-white px-4 lg:px-8 py-4 lg:py-8 shadow">
                        <h1 className="text-xl text-center">Log in to your Account</h1>
                        <div>
                            <label htmlFor="email">Email</label>
                            <div>
                                <input type="text" className="form-control" id="userDetail" placeholder="Enter your  Email or Phone"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <div>
                                <input type="password" className="form-control" id="password" placeholder="******"/>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}