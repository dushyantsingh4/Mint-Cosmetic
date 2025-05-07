import Layout from "@/Layouts/Layout";
import { Head, Link, useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        contact: '',
        password: '',
        company: '',
    });

    const submit = (e)=>{
        e.preventDefault();
        if (!/^\d{10}$/.test(data.contact)) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }
        post(route('customerLogin'), {
            onSuccess: () => {
                toast.success("Logged In Successfully!");
            }
        })
    }
    return (
        <>
            <Layout>
                <Head title="Login" />
                <section className="pt-6">
                    <div className="w-1/2 mx-auto mt-28 mb-4 lg:mb-8 bg-white px-4 lg:px-8 py-4 lg:py-8 shadow">
                        <h1 className="text-xl text-center">Log in to your Account</h1>
                        <form onSubmit={submit}>
                            <input type="text" id="company" name="company" className="hidden" value={data.company || ''} onChange={(e) => setData('company', e.target.value)} />
                            <div className="mb-6">
                                <label className="signup-label" htmlFor="userDetail">Mobile</label>
                                <div>
                                    <input type="text" minLength={10} maxLength={10} className="signup-input" value={data.contact} onChange={(e) => setData('contact', e.target.value)} id="userDetail" name="userDetail" placeholder="Enter your Mobile Number" required />
                                </div>
                                {errors.contact && <small className="text-red-600">{errors.contact}</small>}
                            </div>
                            <div className="mb-6">
                                <label className="signup-label" htmlFor="password">Password</label>
                                <div>
                                    <input type="password" className="signup-input" id="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Create your new Password" required />
                                </div>
                            </div>
                            <div>
                                <button className="btn bg-primary text-sky-50 px-4 py-2 rounded shadow w-24" disabled={processing}>{processing ? <i className="fa-solid fa-spinner"></i> : 'Log In'}</button>
                            </div>
                        </form>
                        <div className="text-priDark mt-8 text-sm">
                            <Link href={route('signup')} >Forgot Password</Link>
                        </div>
                        <div className="text-priDark mt-2 text-sm">
                            <Link href={route('signup')} >Sign Up</Link>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}