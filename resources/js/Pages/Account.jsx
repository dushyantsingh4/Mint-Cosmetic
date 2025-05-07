import Layout from "@/Layouts/Layout"
import { Head, Link } from "@inertiajs/react"
import { usePage } from "@inertiajs/react";


export default function Account() {
    const { auth } = usePage().props;
    return (
        <Layout>
            <Head title={auth.customer.name} />
            <section>
                <div className="container mt-28">
                    <div className="lg:flex gap-10 my-6 pt-6">
                        <div className="w-1/4 bg-white rounded-r-lg px-8 pt-6 border border-slate-300 shadow-xl">
                            <h2 className="font-normal text-xl">Welcome Back,</h2>
                            <p>{auth.customer.name}</p>
                            <ul className="account-ul">
                                <li className="active"><Link href={route('account')}>My Info</Link></li>
                                <li><Link href={route('account')}>My Orders</Link></li>
                                <li><Link href={route('customerLogout')}>Log Out</Link></li>
                            </ul>
                        </div>
                        <div className="w-3/4 bg-white rounded-lg px-8 pt-6 border border-slate-300 shadow">
                            <form action="" method="post" className="h-full">
                                <div className="flex h-full justify-between gap-4">
                                    <div className="w-1/3 h-full flex justify-center items-center flex-col">
                                        <img width={"100px"} src={`/storage/customer/${auth.customer.profile_image}`} alt="" />
                                        <p>{auth.customer.name}</p>
                                    </div>
                                    <div className="w-2/3">
                                        <div className="grid grid-cols-1 lg:grid-cols-2">
                                                <label htmlFor="cusName">Email</label>
                                                <div>
                                                <input type="text" name="cusName" id="cusName" placeholder="Enter mail to verify"/>
                                                <button className="btn bg-emerald-500 px-2 py-1 rounded text-white text-sm shadow hover:bg-emerald-600 hover:shadow-lg">Verfiy</button>
                                                </div>
                                                <label htmlFor="cusName">Address</label>
                                                <input type="text" name="cusName" id="cusName" placeholder="Your Delivery Address"/>
                                        </div>
                                        <div>
                                            <button className="btn bg-primary text-white px-4 py-1 rounded">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    )
}