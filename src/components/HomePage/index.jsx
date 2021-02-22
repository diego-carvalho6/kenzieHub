import { useEffect, useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [tecks, setTecks] = useState(user.techs);
  const [token, setToken] = useState(() => {
    const sessionToken = localStorage.getItem("token") || "";
    return JSON.parse(sessionToken);
  });

  useEffect(() => {
    axios
      .get("https://kenziehub.me/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <div>Home{console.log(user)}</div>
      <button onClick={() => history.push("/newTeck")}>send</button>
      <button onClick={() => history.push("/Users")}>send</button>
      <div>{/* <AddTecks tecks={tecks} setTecks={setTecks}></AddTecks> */}</div>
    </div>
  );
};

export default HomePage;
