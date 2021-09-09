import Box from "@material-ui/core/Box";
import Background from "assets/Image/background.png";

const AuthLayout = ({ children }) => {
  const styles = {
    container: {
      minHeight: "100vh",
      background: `url(${Background})`,
    },
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={styles.container}
    >
      {children}
    </Box>
  );
};

export default AuthLayout;
