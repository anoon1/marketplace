import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/logo/logo.svg';
import SidebarLinkGroup from './SidebarLinkGroup';
import { Link } from 'react-router-dom';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

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
const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-[-1px] top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/OnboardingSeller/WelcomePage" className="flex gap-[12px] items-center">
          {/* <img src={Logo} alt="Logo" /> */}
          <h1 style={logo} className="block font-sans text-5xl antialiased font-semibold leading-tight tracking-normal text-gradient-to-tr bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text">OM</h1>

          <span className="text-[#FFF] md:text-[21px] text-[19px] font-[500] leading-[24px]">Online MarketPlace</span>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svxg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">

          <div>
            <h3 className="mb-[20px] ml-4 text-sm font-[500] text-[#9096A4]">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-[14px]">
              <li>
                <NavLink
                  to="/OnboardingSeller/SellerDashboard"
                  className={`group relative flex items-center gap-[22px] rounded-sm py-2 px-4 font-[400] text-[#FFF] duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 text-[18px] ${pathname === '/OnboardingSeller/SellerDashboard' ? 'bg-graydark dark:bg-meta-4' : ''
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M8.15625 6.75H0V0H8.15625V6.75ZM1.125 5.625H7.03125V1.125H1.125V5.625ZM8.15625 18H0V8.4375H8.15625V18ZM1.125 16.875H7.03125V9.5625H1.125V16.875ZM18 9.5625H9.84375V0H18V9.5625ZM10.9688 8.4375H16.875V1.125H10.9688V8.4375ZM18 18H9.84375V11.25H18V18ZM10.9688 16.875H16.875V12.375H10.9688V16.875Z" fill="white" />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-[22px] rounded-sm py-2 px-4 font-[400] text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 text-[18px] text-[#fff] ${(pathname === '/' ||
                          pathname.includes('dashboard')) &&
                          'bg-graydark dark:bg-meta-4'
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none">
                          <path d="M12.9779 1.70723H17.2386C17.5588 1.70723 17.818 1.96637 17.818 2.28662V22.4206C17.818 22.7409 17.5588 23 17.2386 23H0.57939C0.25914 23 0 22.7409 0 22.4206V2.28662C0 1.96637 0.25914 1.70723 0.57939 1.70723H4.84011V0.57939C4.84011 0.25914 5.09925 0 5.4195 0H12.3985C12.7187 0 12.9779 0.25914 12.9779 0.57939V1.70723ZM8.80379 18.1336C8.48354 18.1336 8.2244 17.8744 8.2244 17.5542C8.2244 17.2339 8.48354 16.9748 8.80379 16.9748H14.3006C14.6209 16.9748 14.88 17.2339 14.88 17.5542C14.88 17.8744 14.6209 18.1336 14.3006 18.1336H8.80379ZM3.10736 17.9595C2.8807 17.7329 2.8807 17.3662 3.10736 17.1404C3.33401 16.9137 3.70067 16.9137 3.92655 17.1404L4.58097 17.7948L6.29284 16.0837C6.51949 15.857 6.88615 15.857 7.11203 16.0837C7.33868 16.3103 7.33868 16.677 7.11203 16.9029L4.99095 19.0239C4.7643 19.2506 4.39764 19.2506 4.17176 19.0239L3.10736 17.9595ZM8.80379 13.8597C8.48354 13.8597 8.2244 13.6006 8.2244 13.2803C8.2244 12.9601 8.48354 12.7009 8.80379 12.7009H14.3006C14.6209 12.7009 14.88 12.9601 14.88 13.2803C14.88 13.6006 14.6209 13.8597 14.3006 13.8597H8.80379ZM3.10736 13.6857C2.8807 13.459 2.8807 13.0924 3.10736 12.8665C3.33401 12.6398 3.70067 12.6398 3.92655 12.8665L4.58097 13.5217L6.29284 11.8098C6.51949 11.5832 6.88615 11.5832 7.11203 11.8098C7.33868 12.0365 7.33868 12.4031 7.11203 12.629L4.99095 14.7501C4.7643 14.9767 4.39764 14.9767 4.17176 14.7501L3.10736 13.6857ZM8.80379 9.58662C8.48354 9.58662 8.2244 9.32748 8.2244 9.00723C8.2244 8.68698 8.48354 8.42784 8.80379 8.42784H14.3006C14.6209 8.42784 14.88 8.68698 14.88 9.00723C14.88 9.32748 14.6209 9.58662 14.3006 9.58662H8.80379ZM3.10736 9.41257C2.8807 9.18592 2.8807 8.81926 3.10736 8.59338C3.33401 8.36673 3.70067 8.36673 3.92655 8.59338L4.58097 9.24781L6.29284 7.53671C6.51949 7.31006 6.88615 7.31006 7.11203 7.53671C7.33868 7.76336 7.33868 8.13002 7.11203 8.3559L4.99095 10.477C4.7643 10.7036 4.39764 10.7036 4.17176 10.477L3.10736 9.41257ZM4.83934 2.86601H1.15801V21.8412H16.6584V2.86601H12.9771V4.27464C12.9771 4.59489 12.718 4.85403 12.3977 4.85403H5.41873C5.09848 4.85403 4.83934 4.59489 4.83934 4.27464V2.86601ZM11.8183 3.69525V2.28662V1.15878H5.99812V2.28662V3.69525H11.8183Z" fill="white" />
                        </svg>
                        Listings
                        <span className="relative left-[-15px] top-[2px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                            <path d="M13 1L7 7L1 1" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </span>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'
                          }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/OnboardingSeller/AllListings"
                              className={`group relative flex items-center gap-[22px] rounded-sm py-2 px-4 font-[400] text-[#FFF] duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 text-[18px] ${pathname === '/OnboardingSeller/AllListings' ? 'bg-graydark dark:bg-meta-4' : ''
                                }`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none">
                                <path d="M12.9779 1.70723H17.2386C17.5588 1.70723 17.818 1.96637 17.818 2.28662V22.4206C17.818 22.7409 17.5588 23 17.2386 23H0.57939C0.25914 23 0 22.7409 0 22.4206V2.28662C0 1.96637 0.25914 1.70723 0.57939 1.70723H4.84011V0.57939C4.84011 0.25914 5.09925 0 5.4195 0H12.3985C12.7187 0 12.9779 0.25914 12.9779 0.57939V1.70723ZM8.80379 18.1336C8.48354 18.1336 8.2244 17.8744 8.2244 17.5542C8.2244 17.2339 8.48354 16.9748 8.80379 16.9748H14.3006C14.6209 16.9748 14.88 17.2339 14.88 17.5542C14.88 17.8744 14.6209 18.1336 14.3006 18.1336H8.80379ZM3.10736 17.9595C2.8807 17.7329 2.8807 17.3662 3.10736 17.1404C3.33401 16.9137 3.70067 16.9137 3.92655 17.1404L4.58097 17.7948L6.29284 16.0837C6.51949 15.857 6.88615 15.857 7.11203 16.0837C7.33868 16.3103 7.33868 16.677 7.11203 16.9029L4.99095 19.0239C4.7643 19.2506 4.39764 19.2506 4.17176 19.0239L3.10736 17.9595ZM8.80379 13.8597C8.48354 13.8597 8.2244 13.6006 8.2244 13.2803C8.2244 12.9601 8.48354 12.7009 8.80379 12.7009H14.3006C14.6209 12.7009 14.88 12.9601 14.88 13.2803C14.88 13.6006 14.6209 13.8597 14.3006 13.8597H8.80379ZM3.10736 13.6857C2.8807 13.459 2.8807 13.0924 3.10736 12.8665C3.33401 12.6398 3.70067 12.6398 3.92655 12.8665L4.58097 13.5217L6.29284 11.8098C6.51949 11.5832 6.88615 11.5832 7.11203 11.8098C7.33868 12.0365 7.33868 12.4031 7.11203 12.629L4.99095 14.7501C4.7643 14.9767 4.39764 14.9767 4.17176 14.7501L3.10736 13.6857ZM8.80379 9.58662C8.48354 9.58662 8.2244 9.32748 8.2244 9.00723C8.2244 8.68698 8.48354 8.42784 8.80379 8.42784H14.3006C14.6209 8.42784 14.88 8.68698 14.88 9.00723C14.88 9.32748 14.6209 9.58662 14.3006 9.58662H8.80379ZM3.10736 9.41257C2.8807 9.18592 2.8807 8.81926 3.10736 8.59338C3.33401 8.36673 3.70067 8.36673 3.92655 8.59338L4.58097 9.24781L6.29284 7.53671C6.51949 7.31006 6.88615 7.31006 7.11203 7.53671C7.33868 7.76336 7.33868 8.13002 7.11203 8.3559L4.99095 10.477C4.7643 10.7036 4.39764 10.7036 4.17176 10.477L3.10736 9.41257ZM4.83934 2.86601H1.15801V21.8412H16.6584V2.86601H12.9771V4.27464C12.9771 4.59489 12.718 4.85403 12.3977 4.85403H5.41873C5.09848 4.85403 4.83934 4.59489 4.83934 4.27464V2.86601ZM11.8183 3.69525V2.28662V1.15878H5.99812V2.28662V3.69525H11.8183Z" fill="white" fill-opacity="0.5" />
                              </svg>
                              My Listing
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/OnboardingSeller/NewListing"
                              className={`group relative flex items-center gap-[22px] rounded-sm py-2 px-4 font-[400] text-[#FFF] duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 text-[18px] ${pathname === '/OnboardingSeller/NewListing' ? 'bg-graydark dark:bg-meta-4' : ''
                                }`}
                            >
                              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.30078 11.8945V10.4414H10.457V5.42578H11.9102V10.4414H17.0781V11.8945H11.9102V16.9219H10.457V11.8945H5.30078Z" fill="#F1F5F9" fill-opacity="0.5" />
                                <circle cx="11" cy="11" r="10.25" stroke="white" stroke-opacity="0.5" stroke-width="1.5" />
                              </svg>
                              Add New Listing
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/OnboardingSeller/ReportingListings"
                              className={`group relative flex items-center gap-[22px] rounded-sm py-2 px-4 font-[400] text-[#FFF] duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 text-[18px] ${pathname === '/OnboardingSeller/ReportingListings' ? 'bg-graydark dark:bg-meta-4' : ''
                                }`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1.90909 1C1.40702 1 1 1.40702 1 1.90909V20.0909C1 20.593 1.40702 21 1.90909 21C2.41116 21 2.81818 20.593 2.81818 20.0909V12.453C3.24184 12.2421 3.91157 11.9481 4.62955 11.7686C5.91737 11.4467 6.95089 11.5655 7.51636 12.4136C8.57182 13.9967 10.5875 14.1362 12.1387 13.9816C13.7757 13.8185 15.3953 13.2825 16.214 12.9796C16.9334 12.7136 17.3636 12.0305 17.3636 11.3098V5.29397C17.3636 3.88361 15.8707 3.06022 14.6808 3.59983C13.7159 4.03744 12.434 4.52614 11.2755 4.68755C10.0635 4.85643 9.35964 4.62791 9.02909 4.13222C7.83645 2.3433 5.79598 2.13151 4.33358 2.25337C3.77218 2.30016 3.25054 2.39833 2.81818 2.50226V1.90909C2.81818 1.40702 2.41116 1 1.90909 1ZM2.81818 4.38279V10.4588C3.21894 10.2952 3.68742 10.13 4.18861 10.0047C5.62806 9.64491 7.77636 9.52609 9.02909 11.405C9.46418 12.0576 10.4668 12.321 11.9585 12.1725C13.3416 12.0346 14.7656 11.5746 15.5455 11.2884V5.29397C15.5455 5.25267 15.4619 5.24203 15.4318 5.25569C14.4159 5.7164 12.9451 6.29065 11.5265 6.48833C10.1615 6.67854 8.464 6.56227 7.51636 5.1408C6.89081 4.20258 5.74945 3.95987 4.48458 4.06527C3.84005 4.11899 3.24025 4.26024 2.81818 4.38279Z" fill="white" fill-opacity="0.5" stroke="#1C2434" stroke-width="0.5" />
                              </svg>
                              Reported Listings
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/OnboardingSeller/RequestedListing"
                  className={`group relative flex items-center gap-[22px] rounded-sm py-2 px-2 font-[400] text-[#FFF] duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 text-[18px] ${pathname === '/OnboardingSeller/RequestedListing' ? 'bg-graydark dark:bg-meta-4' : ''
                    }`}
                >
                  <svg fill="#ffff" xmlns="http://www.w3.org/2000/svg"
                    width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <path d="M77.4,78.1H40.5c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h36.9
	                      c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6C79.8,77,78.8,78.1,77.4,78.1C77.5,78.1,77.5,78.1,77.4,78.1z"/>
                    <path d="M26.6,78.1H22c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h4.6
	                      c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6C29,77,28,78,26.8,78.1C26.7,78.1,26.7,78.1,26.6,78.1z"/>
                    <path d="M53.8,57.6c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h23.6
	                      c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6c0,1.2-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0H53.8z"/>
                    <path d="M62.6,37.1c-1.2,0-2.3-1-2.3-2.2c0,0,0-0.1,0-0.1v-4.6c0-1.2,1-2.3,2.2-2.3c0,0,0.1,0,0.1,0h14.8
	                      c1.2,0,2.3,1,2.3,2.2c0,0,0,0.1,0,0.1v4.6c0,1.2-1,2.3-2.2,2.3c0,0-0.1,0-0.1,0H62.6z"/>
                    <path d="M20.8,58.2C19.6,47.5,28,36.4,38,34.5l2.7-0.6c0.5-0.1,0.9-0.6,0.8-1.2c0-0.3-0.2-0.5-0.4-0.6l-6.7-4.5
	                      c-0.7-0.5-0.8-1.4-0.3-2c0,0,0,0,0-0.1l1.7-2.5c0.4-0.7,1.4-0.9,2-0.4c0,0,0,0,0.1,0L54,33.5c0.7,0.4,0.9,1.4,0.4,2c0,0,0,0,0,0.1
	                      l-11,16.2c-0.4,0.7-1.4,0.9-2,0.4c0,0,0,0-0.1,0l-2.5-1.7c-0.7-0.4-0.9-1.4-0.4-2c0,0,0,0,0-0.1l4.4-6.7c0.3-0.4,0.3-1.1-0.2-1.4
	                      c-0.2-0.2-0.5-0.3-0.8-0.2l-1.6,0.3c-7.8,1.5-14.4,10.3-13.7,17.9c0,0.7-1.1,1.7-1.9,1.9h-1.9C21.8,60.3,20.8,59.1,20.8,58.2z"/>
                  </svg>
                  Listing Bids
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/OnboardingSeller/Inbox"
                  className={`group relative flex items-center gap-[22px] rounded-sm py-2 px-4 font-[400] text-[#FFF] duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 text-[18px] ${pathname === '/OnboardingSeller/Inbox' ? 'bg-graydark dark:bg-meta-4' : ''
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M9.78136 0C4.39586 0 0 4.41887 0 9.82739C0 11.0472 0.23015 12.244 0.667434 13.3947C0.989643 14.2463 1.42693 15.0748 2.02532 15.8113L0.713464 18.9413C0.598389 19.2175 0.644419 19.5167 0.828539 19.7238C0.966628 19.9079 1.19678 20 1.42693 20H1.49597L6.55926 19.1024C7.59494 19.4937 8.65362 19.6778 9.78136 19.6778C15.1669 19.6778 19.5627 15.2589 19.5627 9.8504C19.5627 4.44189 15.1669 0 9.78136 0ZM3.59033 16.0184C3.70541 15.7422 3.65938 15.443 3.47526 15.2359C2.89988 14.5685 2.43959 13.786 2.07135 12.8884C1.70311 11.9217 1.51899 10.8861 1.51899 9.8504C1.49597 7.64097 2.34753 5.54661 3.91254 3.98159C5.47756 2.39356 7.54891 1.51899 9.78136 1.51899C14.3383 1.51899 18.0667 5.24741 18.0667 9.8504C18.0667 14.4534 14.3613 18.1818 9.78136 18.1818C8.79171 18.1818 7.82509 17.9977 6.90449 17.6755C6.81243 17.6525 6.65132 17.6064 6.51323 17.6525L2.64672 18.3199L3.59033 16.0184Z" fill="#F1F5F9" />
                    <path d="M7.904 10.0111C7.9052 9.37557 7.39096 8.85939 6.75542 8.8582C6.11988 8.857 5.6037 9.37124 5.6025 10.0068C5.60131 10.6423 6.11555 11.1585 6.75109 11.1597C7.38663 11.1609 7.90281 10.6467 7.904 10.0111Z" fill="#F1F5F9" />
                    <path d="M10.9079 10.012C10.9091 9.37648 10.3949 8.86031 9.75932 8.85911C9.12378 8.85792 8.60761 9.37216 8.60641 10.0077C8.60522 10.6432 9.11946 11.1594 9.755 11.1606C10.3905 11.1618 10.9067 10.6476 10.9079 10.012Z" fill="#F1F5F9" />
                    <path d="M13.9118 10.012C13.913 9.37648 13.3988 8.86031 12.7632 8.85911C12.1277 8.85792 11.6115 9.37216 11.6103 10.0077C11.6091 10.6432 12.1234 11.1594 12.7589 11.1606C13.3944 11.1618 13.9106 10.6476 13.9118 10.012Z" fill="#F1F5F9" />
                  </svg>
                  Inbox
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-[22px] rounded-sm py-2 px-4 font-[400] text-[#FFF] duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 text-[18px] ${pathname === '/profile' ? 'bg-graydark dark:bg-meta-4' : ''
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="23" viewBox="0 0 19 23" fill="none">
                    <path d="M14.6843 5.14475C14.6843 2.30806 12.3762 0 9.53953 0C6.70283 0 4.39478 2.30806 4.39478 5.14475C4.39478 7.98145 6.70629 10.2895 9.54298 10.2895C12.3762 10.2895 14.6843 7.98145 14.6843 5.14475ZM5.7803 5.14475C5.7803 3.07165 7.46642 1.38207 9.54298 1.38207C11.6195 1.38207 13.3022 3.07165 13.3022 5.14475C13.3022 7.21786 11.6161 8.90744 9.54298 8.90744C7.46988 8.90744 5.7803 7.21786 5.7803 5.14475Z" fill="white" />
                    <path d="M19 18.3226C19 14.56 15.9387 11.5021 12.176 11.5021H6.82051C3.05783 11.5021 0 14.5634 0 18.3226V19.107C0 21.1732 1.68267 22.8558 3.74886 22.8558H15.2511C17.3173 22.8558 19 21.1732 19 19.107V18.3226ZM17.6179 19.107C17.6179 20.413 16.5572 21.4738 15.2511 21.4738H3.75232C2.44626 21.4738 1.38552 20.413 1.38552 19.107V18.3226C1.38552 15.3236 3.82488 12.8842 6.82397 12.8842H12.1795C15.1786 12.8842 17.6214 15.3236 17.6214 18.3226V19.107H17.6179Z" fill="white" />
                  </svg>
                  Profile
                </NavLink>
              </li>


            </ul>
          </div>
        </nav>
      </div>
      {/* <div className='mb-[40px] w-full max-auto px-[16px]'>
        <div className="rounded-[10px] bg-[#273042] py-[34px] px-[25px] text-center">
          <p className="text-[#FFF] text-[14px] font-[400] leading-[20px] mb-[15px]">
            Have any problem with manage your dashboard? Try to contact the Customer Support
          </p>
          <Link
            to="#"
            className="inline-flex items-center justify-center rounded-[5px] bg-[#2174F5] py-[9px] px-[36px] text-center font-[400] text-[#EFF4FB] text-[16px] hover:bg-opacity-90 leading-[28px]"
          >
            Contact Us
          </Link>
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
