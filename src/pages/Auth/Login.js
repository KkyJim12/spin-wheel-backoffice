import LoginForm from "components/Auth/LoginForm";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const LoginPage = () => {
  return (
    <Grid container justify="center">
      <Grid item xs={10} lg={4}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
