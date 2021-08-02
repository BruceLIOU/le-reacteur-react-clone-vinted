import heroBanner from "../assets/img/hero-banner.jpeg";
import tearHero from "../assets/img/tear-hero.svg";
import { Link } from "react-router-dom";

const Hero = ({ userToken }) => {
  return (
    <div className="hero-banner">
      <img className="banner-img" src={heroBanner} alt="Banner" />
      <img
        className="teared-img"
        src={tearHero}
        alt="Teared from paper effect"
      />
      <div className="container">
        <div>
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <Link to={userToken ? "/publish" : "/login"} className="blue-btn">
            Commencer à vendre
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
