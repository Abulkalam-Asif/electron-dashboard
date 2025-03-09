import styles from "./dashboard.module.css";
import Card from "../../components/card/Card";
import H1 from "../../components/h1/H1";
import LinkButton from "../../components/linkButton/LinkButton";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Card>
      <H1>Dashboard</H1>
      <div className={styles.linksContainer}>
        <LinkButton to="/location">Locations</LinkButton>
        <LinkButton to="/attendance-devices">Attendance Devices</LinkButton>
        <LinkButton to="/settings">Settings</LinkButton>
        <Button onClick={logoutHandler} className={styles.logout}>
          Logout
        </Button>{" "}
      </div>
    </Card>
  );
}

export default Dashboard;
