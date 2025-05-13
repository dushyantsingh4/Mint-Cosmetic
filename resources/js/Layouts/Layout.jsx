import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Layout = ({ children }) => {
    return (
        <div className='bg-sky-50'>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
