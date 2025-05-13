import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

const Footer = ()=>{
    const { general } = usePage().props;
    return (
        <>
        <footer className="bg-primary">
        <div className="container mx-auto py-12">
            <div className="flex ">
                <div className="w-full lg:w-1/2 mr-8">
                    <Link href={route('/')} className="nav-link">
                        <div className="h-14 w-14 mb-4"><img src={`/storage/logo/${general.logo}`} alt="logo" /></div>
                    </Link>
                    <p className="text-gray-50 mb-10">{general.description}</p>
                    <div className="flex space-x-4 text-lg">
                        <a href={`${general.ig_link}`} target={"_blank"}>
                            <span className="text-gray-200 hover:text-gray-50"><i className="fa-brands fa-instagram"></i></span>
                        </a>
                        <a href={`${general.yt_link}`}>
                            <span className="text-gray-200 hover:text-gray-50"><i className="fa-brands fa-youtube"></i></span>
                        </a>
                        <a href={`${general.fb_link}`}>
                            <span className="text-gray-200 hover:text-gray-50"><i className="fa-brands fa-facebook-f"></i></span>
                        </a>
                        <a href={`${general.x_link}`}>
                            <span className="text-gray-200 hover:text-gray-50"><i className="fa-brands fa-x-twitter"></i></span>
                        </a>
                    </div>
                </div>

                <div className="w-full lg:w-1/4">
                    <h4 className="text-lg text-gray-50 mb-2">QUICK LINKS</h4>
                    <ul>
                        <li className="mb-2"><a className="text-gray-300  hover:text-gray-50 border-b border-b-transparent hover:border-b-gray-200" href="">Bulk Order</a></li>
                        <li className="mb-2"><a className="text-gray-300  hover:text-gray-50 border-b border-b-transparent hover:border-b-gray-200" href="">Terms & Conditions</a></li>
                        <li className="mb-2"><a className="text-gray-300  hover:text-gray-50 border-b border-b-transparent hover:border-b-gray-200" href="">Privacy Policy</a></li>
                        <li className="mb-2"><a className="text-gray-300  hover:text-gray-50 border-b border-b-transparent hover:border-b-gray-200" href="">Refund Policy</a></li>
                    </ul>
                </div>
                <div className="w-full lg:w-1/4">
                    <h4 className="text-lg text-gray-50 mb-2">CONNECT WITH US</h4>
                    <ul className="mb-8 text-gray-50 text-sm">
                        <li><i className="fa-solid fa-phone"></i> {general.contact}</li>
                        <li><i className="fa-regular fa-envelope"></i> {general.email}</li>
                    </ul>
                    <form action="#" method="post">
                        <h4 className="text-lg text-silver font-semibold mb-2">Subsribe to our NEWSLETTER</h4>
                        <div className="bg-white rounded flex px-2 justify-between">
                            <input type="text" placeholder="Your E-mail ID" className="py-1 outline-0" />
                            <button className="text-primary" type="submit"><i className="fa-solid fa-paper-plane"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </footer>
        </>
    )
}

export default Footer;