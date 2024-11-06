// Layout.jsx
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = ({ darkMode, toggleDarkMode }) => {
    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#EEF7FF] text-slate-900'} flex flex-col items-center transition-colors duration-300`}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <div className="px-4 py-2 w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
