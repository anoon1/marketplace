import Breadcrumb from '../../components/Breadcrumb';
import AdminProfile from '../../components/ProfileAdminInfo';

const ProfileBuyer = () => {
    return (
        <>
            <div className="pl-[72px] pr-[48px]">
                <Breadcrumb pageName="Personal Details" />


                <AdminProfile />
            </div>
        </>
    );
};

export default ProfileBuyer;