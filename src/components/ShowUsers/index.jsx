import axios from "axios";
import { useState, useEffect } from "react";

const ShowUsers = () => {
  const [nextUrl, setNextUrl] = useState(
    "https://kenziehub.me/users?perPage=15&page=1"
  );
  const [users, setUsers] = useState([]);
  axios.get(`${nextUrl}`).then((response) => {
    setUsers(response.data);
  });
  return (
    <>
      <div>
        {users.map((element, index) => (
          <div key={index}>
            <div>{element.name}</div>
            <div>{element.email}</div>
            <div>{element.course_module}</div>
            <div>{element.bio}</div>
            <div>{element.contact}</div>
            <div>
              {element.techs.map((element, index) => (
                <div key={index}>
                  <div>{element.title}</div>
                  <div>{element.status}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowUsers;
