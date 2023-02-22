import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Wrapper className="footer-section container-fluid mt-2">
      <footer>
        <div className="container">
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-text">
                    <p>
                      People with destiny will always find each outher. Your
                      vibe attracts your tribe, so if you want to attract
                      positive and healthy relationships, be one! Staying
                      connected and getting reconnected feeds the flow of
                      goodness which empowers our humanity
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3 className="links">Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/chats">Messages</Link>
                    </li>
                    <li>
                      <Link to="/people-filter">Find People</Link>
                    </li>
                    <li>
                      <Link to="/wish-list">Wish List</Link>
                    </li>
                    <li>
                      <Link to="/job-hire">Start Hire</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3 className="links">Don’t miss</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Don’t miss to connect with new techies. "Connecting with
                      others gives us a sense of inclusion, connection,
                      interaction, safety, and community".
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                <div className="copyright-text">
                  <p>
                    Copyright &copy; {new Date().getFullYear()} , All Right
                    Reserved by
                    <a> Guarenteed</a>
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/chats">Messages</Link>
                    </li>
                    <li>
                      <Link to="/people-filter">Find People</Link>
                    </li>
                    <li>
                      <Link to="/wish-list">Wish List</Link>
                    </li>
                    <li>
                      <Link to="/job-hire">Start Hire</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Wrapper>
  );
}

export default Footer;
const Wrapper = styled.div`
  .links {
    color: rgb(104 96 96) !important;
  }
  ul {
    margin: 0px;
    padding: 0px;
  }
  .footer-section {
    position: relative;
    background-color: #f1ece5;
  }
  .footer-cta {
    border-bottom: 1px solid #373636;
  }
  .single-cta i {
    color: #ff5e14;
    font-size: 30px;
    float: left;
    margin-top: 8px;
  }
  .cta-text {
    padding-left: 15px;
    display: inline-block;
  }
  .cta-text h4 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 2px;
  }
  .cta-text span {
    color: #757575;
    font-size: 15px;
  }
  .footer-content {
    position: relative;
    z-index: 2;
  }
  .footer-pattern img {
    position: absolute;
    top: 0;
    left: 0;
    height: 330px;
    background-size: cover;
    background-position: 100% 100%;
  }
  .footer-logo {
    margin-bottom: 30px;
  }
  .footer-logo img {
    max-width: 200px;
  }
  .footer-text p {
    margin-bottom: 14px;
    font-size: 14px;
    color: #7e7e7e;
    line-height: 28px;
  }
  .footer-social-icon span {
    color: #fff;
    display: block;
    font-size: 20px;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    margin-bottom: 20px;
  }
  .footer-social-icon a {
    color: #fff;
    font-size: 16px;
    margin-right: 15px;
  }
  .footer-social-icon i {
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 38px;
    border-radius: 50%;
  }
  .facebook-bg {
    background: #3b5998;
  }
  .twitter-bg {
    background: #55acee;
  }
  .google-bg {
    background: #dd4b39;
  }
  .footer-widget-heading h3 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 40px;
    position: relative;
  }
  .footer-widget-heading h3::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -15px;
    height: 2px;
    width: 50px;
    background: #ff5e14;
  }
  .footer-widget ul li {
    display: inline-block;
    float: left;
    width: 50%;
    margin-bottom: 12px;
  }
  .footer-widget ul li a:hover {
    color: #b24020;
  }
  .footer-widget ul li a {
    color: #878787;
    text-transform: capitalize;
  }
  .subscribe-form {
    position: relative;
    overflow: hidden;
  }
  .subscribe-form input {
    width: 100%;
    padding: 14px 28px;
    background: #2e2e2e;
    border: 1px solid #2e2e2e;
    color: #fff;
  }
  .subscribe-form button {
    position: absolute;
    right: 0;
    background: #ff5e14;
    padding: 13px 20px;
    border: 1px solid #ff5e14;
    top: 0;
  }
  .subscribe-form button i {
    color: #fff;
    font-size: 22px;
    transform: rotate(-6deg);
  }
  .copyright-area {
    background-color: #fff !important;
    padding: 25px 0;
  }
  .copyright-text p {
    margin: 0;
    font-size: 14px;
    color: #878787;
  }
  .copyright-text p a {
    color: #ff5e14;
  }
  .footer-menu li {
    display: inline-block;
    margin-left: 20px;
  }
  .footer-menu li:hover a {
    color: #b24020;
  }
  .footer-menu li a {
    font-size: 14px;
    color: #878787;
  }
`;
