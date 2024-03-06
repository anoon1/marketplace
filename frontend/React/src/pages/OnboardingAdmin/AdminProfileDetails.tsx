import Breadcrumb from '../../components/Breadcrumb';
import AdminProfileInfo from '../../components/AdminProfileInfo';

const AdminProfileDetails = () => {
    return (
        <>
            <div className="md:pl-[72px] pl-[0] md:pr-[48px] pr-[0]">
                <Breadcrumb pageName="Profile" />

                <AdminProfileInfo />
            </div>
        </>
    );
};

export default AdminProfileDetails;