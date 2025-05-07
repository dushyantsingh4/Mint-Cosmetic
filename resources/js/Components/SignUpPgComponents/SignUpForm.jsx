import { useForm } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function SignUpForm() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        contact: '',
        password: '',
        confirm_password: '',
        company: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (!/^\d{10}$/.test(data.contact)) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }
        if (data.password !== data.confirm_password) {
            toast.error("Password does not match!");
            return;
        }
        if(data.password.length < 6){
            toast.error("Password must be 6 characters");
            return;
        }

        post(route('registerCustomer'), {
            onSuccess: () => {
                toast.success("Account Created Successfully!");
            },
            onError: () => {
                toast.error("Please check the form for errors.");
            }
        })
    }
    return (
        <form onSubmit={submit}>
            <input type="text" id="company" name="company" className="hidden" value={data.company || ''} onChange={(e)=>setData('company', e.target.value)}/>
            <div className="mb-6">
                <label className="signup-label" htmlFor="userName">Name</label>
                <div>   
                    <input type="text" className="signup-input" value={data.name} onChange={(e) => setData('name', e.target.value)} id="userName" placeholder="Enter your Full Name" required/>
                </div>
                {errors.name && <small className="text-red-600">{errors.name}</small>}
            </div>
            <div className="mb-6">
                <label className="signup-label" htmlFor="userDetail">Mobile Number</label>
                <div>
                    <input type="text" minLength={10} maxLength={10} className="signup-input" value={data.contact} onChange={(e) => setData('contact', e.target.value)} id="userDetail" name="userDetail" placeholder="Enter your Contact Number" required/>
                </div>
                {errors.contact && <small className="text-red-600">{errors.contact}</small>}
            </div>
            <div className="mb-6">
                <label className="signup-label" htmlFor="password">Password</label>
                <div>
                    <input type="password" className="signup-input" id="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Create your new Password" required/>
                </div>
                {errors.password && <small className="text-red-600">{errors.password}</small>}
            </div>
            <div className="mb-6">
                <label className="signup-label" htmlFor="confPassword">Confirm Password</label>
                <div>
                    <input type="password" className="signup-input" id="confPassword" name="confPassword" value={data.confirm_password} onChange={(e) => setData('confirm_password', e.target.value)} placeholder="Confirm Password" required/>
                </div>
                {errors.confirm_password && <small className="text-red-600">{errors.confirm_password}</small>}
            </div>
            <div>
                <button className="btn bg-primary text-sky-50 px-4 py-2 rounded shadow w-24" disabled={processing}>{processing ? <i className="fa-solid fa-spinner"></i> : 'Sign Up'}</button>
            </div>
        </form>
    )
}