import Breadcrumb from '../../components/Breadcrumb';
import WelcomeBrand from '../../components/welcomeBrandSeller';
import { useLocation } from 'react-router-dom';

const Onboarding = () => {
  return (
    <>
      <Breadcrumb pageName="Onboarding" />
      <WelcomeBrand />
    </>
  );
};

export default Onboarding;
