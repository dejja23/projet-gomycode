import React from "react";
import "./FooterPage.scss";
const FooterPage = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3>
          GOOO<span>Annonce</span>
        </h3>

        <p className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>

          <a href="#">Blog</a>

          <a href="#">About</a>

          <a href="#">Contact</a>
        </p>

        <p className="footer-company-name">Go Annonce Name © 2020</p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>12 lac Ave</span> lac 1 , Tunis
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+216.52.525.252</p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="mailto:support@company.com">go.annonce@gmail.com</a>
          </p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the Annonce</span>
          GoAnnonce se présente comme une plateforme de consommation
          collaborative qui met en relation essentiellement des particuliers
          souhaitant vendre ou acheter.
          <hr />
          <span> Open hours</span>
          <i className="far fa-clock">Monday Thursday</i>
          <p>9:00am - 5:00pm</p>
          <i className="far fa-clock">Friday</i>
          <p>9:00am - 4:00pm</p>
          <i className="far fa-clock">Sturday</i>
          <p>9:00am - 1:30pm</p>
          <i className="far fa-clock">Sunday</i>
          <p>9:30am - 12:00pm</p>
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
