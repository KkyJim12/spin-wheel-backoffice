import axios from "axios";
import Template from "components/Main/Template";
import { useEffect } from "react";
import { useHistory } from "react-router";

const AppLayout = ({ children }) => {
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    }
  }, [localStorage.getItem("token")]);

  return (
    <>
      <Template content={children} />
    </>
  );
};

export default AppLayout;
