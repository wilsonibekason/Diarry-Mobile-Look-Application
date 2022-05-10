import React, { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user-login")) {
      history.pushState("/add");
    }
  }, []);

  const onsubmit = async () => {
    let item = (email, password);
    let API = await fetch("api details", {
      method: "POST",
      headers: {
        "content-type": "appliccation/json",
        Accept: "application/json",
      },
      body: JSON.stringify(item),
    });
    result = await API.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    history.pushState("/add");
  };
  return <div>Login</div>;
};

export default Login;
