import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            {/* Footer Column 1 */}
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>
                We provide the best services to make your life better. Follow us
                on social media to stay updated!
              </p>
            </div>

            {/* Footer Column 2 */}
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#home" className="text-light">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-light">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-light">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-light">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Footer Column 3 */}
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <a href="https://facebook.com" className="text-light me-3">
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <br />
              <a href="https://twitter.com" className="text-light me-3">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <br />
              <a href="https://instagram.com" className="text-light">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Your Company. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
