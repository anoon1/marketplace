import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const WelcomePage = lazy(() => import('../pages/OnboardingSeller/WelcomePage'));
const SellerDashboard = lazy(() => import('../pages/OnboardingSeller/SellerDashboard'));
const NoListings = lazy(() => import('../pages/OnboardingSeller/NoListings'));
const NoReportedListings = lazy(() => import('../pages/OnboardingSeller/NoReportedListings'));
const NewListing = lazy(() => import('../pages/OnboardingSeller/NewListing'));
const AllListings = lazy(() => import('../pages/OnboardingSeller/AllListings'));
const ReportingListings = lazy(() => import('../pages/OnboardingSeller/ReportingListings'));
const ProfileDetails = lazy(() => import('../pages/OnboardingSeller/ProfileDetails'));
const AdminProfileDetails = lazy(() => import('../pages/OnboardingAdmin/AdminProfileDetails'));

const RequestedListings = lazy(() => import('../pages/OnboardingSeller/RequestedListing'));
const WelcomeBuyer = lazy(() => import('../pages/OnboardingBuyer/WelcomeBuyer'));
const Inbox = lazy(() => import('../pages/OnboardingSeller/Inbox'));
const ProfileBuyer = lazy(() => import('../pages/OnboardingBuyer/ProfileBuyer'));
const BuyerBrowsing = lazy(() => import('../pages/OnboardingBuyer/BuyerBrowsing'));
const ListingDetails = lazy(() => import('../pages/OnboardingBuyer/ListingDetails'));
const MyDeals = lazy(() => import('../pages/OnboardingBuyer/MyDeals'));
const MyFavorites = lazy(() => import('../pages/OnboardingBuyer/MyFavorites'));
const BuyerInbox = lazy(() => import('../pages/OnboardingBuyer/BuyerInbox'));
const BuyerReportingList = lazy(() => import('../pages/OnboardingBuyer/BuyerReportingList'));
const WelcomeAdmin = lazy(() => import('../pages/OnboardingAdmin/adminHome'));
const AdminSellerListing = lazy(() => import('../pages/OnboardingAdmin/AllListingDetails'));
const AdminBuyerDeals = lazy(() => import('../pages/OnboardingAdmin/UsersDeals'));
const AdminReportingList = lazy(() => import('../pages/OnboardingAdmin/AdminReportedList'));
const AdminProfile = lazy(() => import('../pages/OnboardingAdmin/ProfileAdmin'));
const AdminDashboard = lazy(() => import('../pages/OnboardingAdmin/AdminDashboard'));
const Documents = lazy(() => import('../pages/OnboardingAdmin/AdminDocumentsVerification'));
const DocumentViewer = lazy(() => import('../pages/OnboardingAdmin/AdminDocumentView'));
const BuyerPayment = lazy(() => import('../pages/OnboardingBuyer/BuyerPayment'));
const coreRoutes = [

  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/OnboardingSeller/WelcomePage',
    title: 'WelcomePage',
    component: WelcomePage,
  },
  {
    path: '/OnboardingSeller/SellerDashboard',
    title: 'Seller Dashboard',
    component: SellerDashboard,
  },
  {
    path: '/OnboardingSeller/NoListings',
    title: 'No Listings',
    component: NoListings,
  },
  {
    path: '/OnboardingSeller/NoReportedListing',
    title: 'No Reported Listings',
    component: NoReportedListings,
  },

  {
    path: '/OnboardingBuyer/NoReportedListing',
    title: 'No Reported Listings',
    component: NoReportedListings,
  },

  {
    path: '/OnboardingSeller/NewListing',
    title: 'New Listing',
    component: NewListing,
  },
  {
    path: '/OnboardingSeller/AllListings',
    title: 'All Listings',
    component: AllListings,
  },
  {
    path: '/OnboardingSeller/ReportingListings',
    title: 'Reporting Listings',
    component: ReportingListings,
  },

  {
    path: '/OnboardingBuyer/Payment',
    title: 'Payment',
    component: BuyerPayment,
  },

  {
    path: '/OnboardingSeller/RequestedListing',
    title: 'Reporting Listings',
    component: RequestedListings,
  },

  {
    path: '/OnboardingSeller/ProfileDetails',
    title: 'Profile',
    component: ProfileDetails,
  },
  {
    path: '/OnboardingBuyer/Welcome',
    title: 'Welcome Buyer',
    component: WelcomeBuyer,
  },
  {
    path: '/OnboardingSeller/Inbox',
    title: 'Inbox',
    component: Inbox,
  },
  {
    path: '/OnboardingBuyer/ProfileBuyer',
    title: 'Profile Buyer',
    component: ProfileBuyer,
  },
  {
    path: '/OnboardingBuyer/BuyerBrowsing',
    title: 'Buyer Browsing',
    component: BuyerBrowsing,
  },
  {
    path: '/OnboardingBuyer/ListingDetails/:id',
    title: 'Listing Details',
    component: ListingDetails,
  },
  {
    path: '/OnboardingBuyer/MyDeals',
    title: 'MyDeals',
    component: MyDeals,
  },
  {
    path: '/OnboardingBuyer/MyFavorites',
    title: 'My Favorites',
    component: MyFavorites,
  },
  {
    path: '/OnboardingBuyer/BuyerInbox',
    title: 'Messages',
    component: BuyerInbox,
  },
  {
    path: '/OnboardingBuyer/BuyerReportingList',
    title: 'Messages',
    component: BuyerReportingList,
  },
  {
    path: '/OnboardingAdmin/dashboard',
    title: 'Admin Dashboard',
    component: AdminDashboard,
  },
  {
    path: '/OnboardingAdmin/Welcome',
    title: 'Welcome Admin',
    component: WelcomeAdmin,
  },

  {
    path: '/OnboardingAdmin/DocumentVerification',
    title: 'Dcouments',
    component: Documents,
  },

  {
    path: '/OnboardingAdmin/AdminSellerListing',
    title: 'Seller Listing',
    component: AdminSellerListing,
  },

  {
    path: '/OnboardingAdmin/BuyerDeals',
    title: 'Seller Listing',
    component: AdminBuyerDeals,
  },

  {
    path: '/OnboardingAdmin/ReportedListing',
    title: 'Reported Listing',
    component: AdminReportingList,
  },
  {
    path: '/OnboardingAdmin/Profile',
    title: 'Profile Details',
    component: AdminProfileDetails,
  },

  {
    path: '/OnboardingAdmin/AdminProfile',
    title: 'Admin profile',
    component: AdminProfile,
  },

  {
    path: '/OnboardingAdmin/DocumentViewer',
    title: 'Admin profile',
    component: DocumentViewer,
  },
];

const routes = [...coreRoutes];
export default routes;
