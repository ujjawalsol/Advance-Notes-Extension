import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen bg-[#EEF7FF] text-slate-900 dark:bg-gray-900 dark:text-gray-100 flex flex-col items-center transition-colors duration-300">
            <Header />
            <div className="px-4 py-2 w-full mt-[4.5rem]">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
