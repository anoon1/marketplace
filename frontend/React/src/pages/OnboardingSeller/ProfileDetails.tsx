import Breadcrumb from '../../components/Breadcrumb';
import ProfileInfo from '../../components/ProfileInfo';

const ProfileDetails = () => {
    return (
        <>
            <div className="md:pl-[72px] pl-[0] md:pr-[48px] pr-[0]">
                <Breadcrumb pageName="Profile" />

                <ProfileInfo />
            </div>
        </>
    );
};

export default ProfileDetails;