import Breadcrumb from '../../components/Breadcrumb';
import ProfileBuyerInfo from '../../components/ProfileBuyerInfo';

const ProfileBuyer = () => {
    return (
        <>
            <div className="md:pl-[72px] pl-[0] md:pr-[48px] pr-[0]">
                <Breadcrumb pageName="Profile" />

                <ProfileBuyerInfo />
            </div>
        </>
    );
};

export default ProfileBuyer;