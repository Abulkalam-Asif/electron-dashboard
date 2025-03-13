import styles from "./dashboard.module.css";
import Card from "../../components/general/card/Card";
import H1 from "../../components/general/h1/H1";
import LinkButton from "../../components/general/linkButton/LinkButton";
import Button from "../../components/general/button/Button";
import { useNavigate } from "react-router-dom";
import { useAlert } from "@renderer/contexts/AlertContext";

function Dashboard() {
  const { showAlert } = useAlert();

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
    showAlert({ message: "Logged out successfully", type: "success" });
  };
  return (
    <Card cardClassName={styles.card}>
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
