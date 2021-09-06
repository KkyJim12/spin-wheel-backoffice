import Template from 'components/Main/Template';

const AppLayout = ({ children }) => {
  return (
    <>
      <Template content={children} />
    </>
  );
};

export default AppLayout;
