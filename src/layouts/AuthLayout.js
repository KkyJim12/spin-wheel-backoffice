import Box from '@material-ui/core/Box';

const AuthLayout = ({ children }) => {
  const styles = {
    container: {
      minHeight: '100vh',
    },
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      style={styles.container}
    >
      {children}
    </Box>
  );
};

export default AuthLayout;
