import Breadcrumb from '../../components/Breadcrumb';
import Messages from '../../components/Messages';


const Inbox = () => {
  return (
    <>
      <Breadcrumb pageName="Messages" />

      <Messages />
    </>
  );
};

export default Inbox;