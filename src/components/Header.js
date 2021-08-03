import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import SearchFilters from "./SearchFilters";
import logo from "../assets/img/vinted-logo.png";
import LoginModal from "./modals/LoginModal";
import SignUpModal from "./modals/SignUpModal";

const Header = ({ apiUrl, currentUser, userToken, setData, limit, page }) => {
  const history = useHistory();
  const location = useLocation();

  const [hideLoginModal, setHideLoginModal] = useState(true);
  const [hideSignUpModal, setHideSignUpModal] = useState(true);

  return (
    <>
      <div className="container">
        <header>
          <Link to="/">
            <img src={logo} alt="Logo Vinted" />
          </Link>
          <SearchFilters
            setData={setData}
            limit={limit}
            page={page}
            apiUrl={apiUrl}
          />

          {!userToken && location.pathname !== "/signup" && (
            // Not displayed to logged in users and on sign up page
            <div
              className="white-btn"
              onClick={() => {
                setHideSignUpModal(false);
              }}
            >
              S'inscrire
            </div>
          )}
          {userToken ? (
            // Displayed when user is logged in
            <div
              className="red-btn"
              onClick={() => {
                currentUser(null);
                history.push("/");
              }}
            >
              Se deconnecter
            </div>
          ) : (
            // Displayed when user isn't logged in and not on login page
            location.pathname !== "/login" && (
              <div
                className="white-btn"
                onClick={() => {
                  setHideLoginModal(false);
                }}
              >
                Se connecter
              </div>
            )
          )}
          <Link
            className="blue-btn"
            // User not logged in wre redirected to login page
            to={userToken ? "/publish" : "/login"}
          >
            Vends tes articles
          </Link>
        </header>
      </div>
      <LoginModal
        hideLoginModal={hideLoginModal}
        currentUser={currentUser}
        setHideLoginModal={setHideLoginModal}
        apiUrl={apiUrl}
      />
      <SignUpModal
        hideSignUpModal={hideSignUpModal}
        currentUser={currentUser}
        setHideSignUpModal={setHideSignUpModal}
        apiUrl={apiUrl}
      />
    </>
  );
};

export default Header;
