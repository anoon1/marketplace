import Breadcrumb from '../../components/Breadcrumb';
import BuyerMessages from '../../components/BuyerMessages';


const BuyerInbox = () => {
    return (
        <>
            <Breadcrumb pageName="Messages" />
            <BuyerMessages />
        </>
    );
};

export default BuyerInbox;