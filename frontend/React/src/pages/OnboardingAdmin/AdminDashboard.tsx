import Breadcrumb from '../../components/Breadcrumb';
import AdminDetails from '../../components/AdminDashboard';


const AdminDashboard = () => {
    return (
        <>

            <Breadcrumb pageName="Dashboard" />
            <AdminDetails />
        </>
    );
};

export default AdminDashboard;