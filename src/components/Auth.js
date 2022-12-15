import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault();

    const url = "https://socialmtn.devmountain.com";
    const body = { username, password };

    axios
      .post(register ? `${url}/register` : `${url}/login`, body)
      .then((res) => {
          authCtx.login(res.data.token, res.data.exp, res.data.userId)
        console.log(res.data);
      })
      .catch((err) => {
        setUsername("");
        setPassword("");
      });
    // if(register){
    //     axios.post(url + '/register', {
    //         username, password
    //     }).then(res => console.log(res.data))
    //     .catch(err => {
    //         setUsername('')
    //         setPassword('')
    //     })
    // } else {
    //     axios.post(url + '/login', {
    //         username, password
    //     }).then(res => console.log(res.data))
    //     .catch(err => {
    //         setUsername('')
    //         setPassword('')
    //     })
    // }

    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          placeholder="Username"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {console.log(username, password)}
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
