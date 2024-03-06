import Breadcrumb from '../../components/Breadcrumb';
import AdminReportingListing from '../../components/AdminReportingListing';

const AdminReportingList = () => {
    return (
        <>
            <Breadcrumb pageName="Reported Listings" />
            <AdminReportingListing />
        </>
    );
};

export default AdminReportingList;