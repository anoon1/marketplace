import Breadcrumb from '../../components/Breadcrumb';
import DocumentViewer from '../../components/DocumentViewer';


const AdminDocumentViewer = () => {
    return (
        <>

            <Breadcrumb pageName="Documents View" />
            <DocumentViewer />
        </>
    );
};

export default AdminDocumentViewer;