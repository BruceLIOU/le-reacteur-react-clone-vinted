// import CSS
import "./assets/css/App.scss";
import "./assets/css/media-queries.scss";

// import Component/Package React
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Import containers first
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";

// Then import components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// import Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretLeft,
  faCaretRight,
  faTimesCircle,
  faSearch,
  faPlusCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faCaretLeft,
  faCaretRight,
  faTimesCircle,
  faSearch,
  faPlusCircle,
  faCheckCircle
);

function App() {
  const apiUrl = "https://clone-vinted-backend.herokuapp.com"; // URL API
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null); // For authentification
  const [data, setData] = useState([]); // From API request
  const [page, setPage] = useState(1); // For page nav
  const [limit, setLimit] = useState(10); // For page nav (limit default : 25)

  const currentUser = (token) => {
    if (token) {
      // LogIn => create a cookie
      Cookies.set("userToken", token, {
        expires: 365, // expires : 1 year
        sameSite: "none",
        secure: true,
      });
      setUserToken(token);
    } else {
      // LogOut => remove the cookie
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header
        userToken={userToken}
        currentUser={currentUser}
        setData={setData}
        limit={limit}
        page={page}
        apiUrl={apiUrl}
      />
      <Switch>
        <Route path="/offer/:_id">
          <Offer userToken={userToken} apiUrl={apiUrl} />
        </Route>
        <Route path="/signup">
          <SignUp currentUser={currentUser} apiUrl={apiUrl} />
        </Route>
        <Route path="/login">
          <Login currentUser={currentUser} apiUrl={apiUrl} />
        </Route>
        <Route path="/">
          <Hero userToken={userToken} />
          <Home
            data={data}
            setData={setData}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            apiUrl={apiUrl}
          />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
