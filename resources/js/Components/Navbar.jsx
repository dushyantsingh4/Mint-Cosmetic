import { Link, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '@/Context/CartContext';

const Navbar = () => {
    // const { general } = usePage().props;
    const { auth, general } = usePage().props;
    const cartContext = useContext(CartContext);
    const [keyword, setKeyword] = useState('');
    const handleSearchForm = (e) => {
        e.preventDefault();
        const trimmed = keyword.trim();
        const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
        if(!trimmed || trimmed.length < 2 || htmlTagRegex.test(trimmed)){
            toast.error("That doesn’t look right 👀");
            return;
        }
        router.get(route('search'), {q:keyword});
    }
    return (
        <nav className="nav">
            <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
                <Link href={route('/')} className="nav-link">
                <div className="h-14 w-14"><img src={`/storage/logo/${general.logo}`} alt="logo" /></div>
                </Link>
                <div className="hidden lg:block">
                    <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600 border border-slate-400 px-2 hover:border-slate-600 focus:border-slate-800 rounded">
                            <form action="#" method="post" id="searchForm" onSubmit={handleSearchForm}>
                                <input type="text" placeholder="You are looking for..." className="outline-0" value={keyword} onInput={(e) => setKeyword(e.target.value)} id="keyword" />
                                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                            </form>
                        </li>
                        <li className="group flex items-center p-1 text-sm gap-x-2 font-semibold border-b border-b-transparent hover:border-b-slate-600 text-slate-600 hover:text-slate-800">
                            <a className="flex items-center">Categories</a>
                            <div className="nav-dd-wrapper">
                                <div className='nav-dd'>
                                <div className='nav-dd-cat'>
                                        <p className='nav-dd-head'>LIPS</p>
                                        <ul className='nav-dd-li'>
                                            <li><Link href={route('subProducts', { slug: 'lips', productSlug: 'lipstick' })}> Lipstick</Link></li>
                                            <li><Link href={route('subProducts', { slug: 'lips', productSlug: 'liquid-lipstick' })}> Liquid Lipstick</Link></li>
                                            <li><Link href={route('subProducts', { slug: 'lips', productSlug: 'lip-gloss' })}> Lip Gloss</Link></li>
                                            <li><Link href={route('subProducts', { slug: 'lips', productSlug: 'lip-liner' })}> Lip Liner</Link></li>
                                            <li><Link href={route('subProducts', { slug: 'lips', productSlug: 'lip-care' })}> Lip Care</Link></li>
                                            <li><Link href={route('products', { slug: 'lips' })}>View All</Link></li>
                                        </ul>
                                    </div>
                                    <div className='nav-dd-cat'>
                                        <p className='nav-dd-head'>FACE</p>
                                        <ul className='nav-dd-li'>
                                            <li><Link href={route('subProducts', { slug: 'face', productSlug: 'foundation' })}> Foundation</Link></li>
                                            <li><Link href={route('subProducts', { slug: 'face', productSlug: 'concealer' })}> Concealer</Link></li>
                                            <li><Link href={route('subProducts', { slug: 'face', productSlug: 'blush' })}> Blush</Link></li>
                                            <li><Link href={route('subProducts', { slug: 'face', productSlug: 'compact' })}> Compact</Link></li>
                                            <li><Link href={route('products', { slug: 'face' })}>View All</Link></li>
                                        </ul>
                                    </div>
                                    <div className='nav-dd-cat'>
                                        <p className='nav-dd-head'>SKIN</p>
                                        <ul className='nav-dd-li'>
                                            <li><Link href={route('subProducts', { slug: 'skin', productSlug: 'serum' })}> Serum</Link></li>
                                            <li><Link href={route('subProducts', { slug: 'skin', productSlug: 'moisturiser' })}> Moisteriser</Link></li>
                                            <li><Link href={route('products', { slug: 'skin' })}>View All</Link></li>
                                        </ul>
                                    </div>
                                    <div className='nav-dd-cat'>
                                        <p className='nav-dd-head'>EYES</p>
                                        <ul className='nav-dd-li'>
                                            <li><Link href={route('subProducts', { slug: 'eyes', productSlug: 'mascara' })}> Mascara</Link></li>
                                            <li><Link href={route('subProducts', { slug: 'eyes', productSlug: 'eyeliner' })}> Eyeliner</Link></li>
                                            <li><Link href={route('products', { slug: 'eyes' })}>View All</Link></li>
                                        </ul>
                                    </div>
                                    <div className='nav-dd-cat'>
                                        <p className='nav-dd-head'>NAILS</p>
                                        <ul className='nav-dd-li'>
                                            <li><Link href={route('subProducts', { slug: 'nails', productSlug: 'nail-polish' })}> Nail Polish</Link></li>
                                            <li><Link href={route('products', { slug: 'nails' })}>View All</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li
                            className="flex items-center p-1 text-sm gap-x-2 font-semibold border-b border-b-transparent hover:border-b-slate-600 text-slate-600 hover:text-slate-800">
                            <Link href={route('subscription')} className="nav-link">
                                Subsription
                            </Link>
                        </li>
                        <li
                            className="flex items-center p-1 text-sm gap-x-2 pr-3 font-semibold border-b border-b-transparent hover:border-b-slate-600 text-slate-600 hover:text-slate-800">
                            <Link href={route('gifting')} className="nav-link">
                                Gifting
                            </Link>
                        </li>
                        <li
                            className="flex items-center p-1 text-sm gap-x-2 pr-3 font-semibold border-b border-b-transparent hover:border-b-slate-600 text-slate-600 hover:text-slate-800">
                            <Link
                                href={route('cart')}
                                className="nav-link inline-block relative"
                            >
                                <span>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </span>
                                <span className='cart-count'>{cartContext.cart.reduce((total, item) => total + item.quantity, 0)}</span>
                                Cart
                            </Link>
                        </li>
                        <li
                            className="flex items-center p-1 text-sm gap-x-2 pr-3 font-semibold border-b border-b-transparent hover:border-b-slate-600 text-slate-600 hover:text-slate-800">
                            <Link
                                href={auth.customer ? route('account') : route('login')}
                                className="nav-link"
                            >
                                <span>
                                    <i className="fa-regular fa-user"></i>
                                </span>
                                {auth.customer ? auth.customer.name : 'Login'}
                            </Link>
                        </li>
                    </ul>
                </div>
                <button
                    className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
                    type="button">
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor"
                            strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar;