import { Link, useLocation } from 'react-router-dom';
interface BreadcrumbMainProps {
  pageName: string;
}
const BreadcrumbMain = ({ pageName }: BreadcrumbMainProps) => {
  let { pathname } = useLocation()
  let role = localStorage.getItem('role');
  let redirectPath;
  if (role == 'buyer') {
    redirectPath = 'OnboardingBuyer/Welcome';
  } else if (role == 'seller') {
    redirectPath = 'OnboardingSeller/WelcomePage';
  } else if (role == 'admin') {
    redirectPath = 'OnboardingAdmin/Welcome';
  }
  const handleNames = (routeName: any) => {
    switch (routeName) {
      case '/OnboardingSeller/ProfileDetails':
        return 'Edit Profile'
        break;
      case '/profile':
        return 'Profile'
        break;
      case '/OnboardingSeller/Inbox':
        return 'Inbox'
        break;
      case '/OnboardingSeller/ReportingListings':
        return 'Reporting Listings'
        break;
      case '/OnboardingSeller/AllListings':
        return 'Listing'
        break;
      case '/OnboardingAdmin/DocumentViewer':
        return 'Document'
        break;
      case '/OnboardingAdmin/DocumentVerification':
        return 'Document Verification'
        break;
      case '/OnboardingSeller/NewListing':
        return 'Create Listing'
        break;
      case '/OnboardingSeller/NoReportedListing':
        return 'No Reported Listing'
        break;
      case '/OnboardingSeller/NoListings':
        return 'No Listing'
        break;
      case '/OnboardingSeller/RequestedListing':
        return 'Listing Bid'
        break;

      case '/OnboardingAdmin/dashboard':
        return 'Admin Dashboard'
        break;
      case '/OnboardingAdmin/AdminSellerListing':
        return 'Seller Listing'
        break;
      case '/OnboardingAdmin/BuyerDeals':
        return 'Buyer Listing'
        break;
      case '/OnboardingAdmin/ReportedListing':
        return 'Reported Listing'
        break;
      case '/OnboardingAdmin/AdminProfile':
        return 'Admin Profile'
        break;


      case '/OnboardingBuyer/BuyerBrowsing':
        return 'Browsing'
        break;
      case '/OnboardingBuyer/MyDeals':
        return 'Deals'
        break;
      case '/OnboardingBuyer/MyFavorites':
        return 'Favourites'
        break;
      case '/OnboardingBuyer/BuyerInbox':
        return 'Inbox'
        break;
      case '/OnboardingBuyer/ProfileBuyer':
        return 'Profile'
        break;
      case '/OnboardingBuyer/BuyerReportingList':
        return 'Reported Listing'
      default:
        return 'Home'
        break;
    }
  }
  return (
    <nav>
      <ol className="flex items-center gap-2">
        <li className="text-[#535D7A] text-[18px] font-[400] leading-[28px]">
          <Link to={redirectPath}>Dashboard /</Link>
        </li>
        <li className="text-[#535D7A] text-[18px] font-[400] leading-[28px]">
          <Link to={pathname}>{handleNames(pathname)}</Link>
        </li>
      </ol>
    </nav>
  );
};

export default BreadcrumbMain;
