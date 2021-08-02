// import packages
import axios from "axios";

import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = ({ currentUser, apiUrl }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // Redirect after login
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${apiUrl}/user/login`, {
        email: inputEmail,
        password: inputPassword,
      });
      //console.log(apiUrl);
      currentUser(response.data.token);
      // Redirect previous page (n-1)
      //history.goBack();
      // Redirect to publish
      history.push("/publish");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <section className="login-section">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Adresse email"
            value={inputEmail}
            onChange={(event) => {
              setInputEmail(event.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={inputPassword}
            onChange={(event) => {
              setInputPassword(event.target.value);
            }}
            required
          />
          <button className="blue-btn" type="submit">
            Se connecter
          </button>
        </form>
        <Link to="/signup">Pas encore de compte ? Inscris-toi !</Link>
      </section>
    </div>
  );
};

export default Login;
