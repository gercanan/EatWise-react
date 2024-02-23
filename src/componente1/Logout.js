import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Logout = () => {

    let navigate = useNavigate();

    const Logout = () => {
        localStorage.clear();
        navigate("/");
    }


  return (
    <Button variant="outline-danger" onClick={Logout}>Logout</Button>
  )
}

export default Logout