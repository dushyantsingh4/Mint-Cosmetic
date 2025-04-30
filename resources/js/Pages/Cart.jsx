import Layout from "@/Layouts/Layout"
import { Head, Link } from "@inertiajs/react"
import CartItem from "@/Components/CartPgComponents/CartItem";
import BreakUp from "@/Components/CartPgComponents/BreakUp";

const Cart = ()=>{
    return(
        <Layout>
            <Head title="Cart" />
            <section>
                <div className="container mx-auto mt-28 mb-4 px-4 py-8 bg-white border border-stone-200 rounded shadow-sm">
                    <h1 className="text-2xl mb-4">Shopping Cart</h1>
                    <hr />
                    <div className="lg:flex">
                        <div className="w-8/12">
                            <CartItem />
                            <div className="flex justify-center">
                                <Link href={route('/')} className="link-cont-shop">Continue Shopping</Link>
                            </div>
                        </div>
                        <div className="w-4/12">
                            <BreakUp />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Cart;