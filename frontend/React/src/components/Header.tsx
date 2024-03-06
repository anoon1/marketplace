import { Link } from 'react-router-dom';
import Logo from '../assets/logo/logo-icon.svg';

import DropdownUser from './DropdownUser';
import BreadcrumbMain from './BreadcrumbMain';
const logo = {
  background: 'linear-gradient(89deg, #E84DB2 4.36%, #2174F5 98.1%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontFamily: 'font-serif',
  fontWeight: 'bold',
  fontSize: '35px',
  lineHeight: '1.5',
};

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white">
      <div className="flex flex-grow items-center justify-between py-5 px-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-[2.5px] w-0 rounded-sm bg-[#222] delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'
                    }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-[2.5px] w-0 rounded-sm bg-[#222] delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-[2.5px] w-0 rounded-sm bg-[#222] delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            {/* <img src={Logo} alt="Logo" /> */}
            <h1 style={logo} className="block font-sans text-5xl antialiased font-semibold leading-tight tracking-normal text-gradient-to-tr bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text">OM</h1>


          </Link>
        </div>

        <div className="hidden sm:block">
          <BreadcrumbMain pageName="Home" />
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">


          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
