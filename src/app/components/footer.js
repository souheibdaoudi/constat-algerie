import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5>Contact Information</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-map-marker-alt"></i> 1234 Street Name, City, Country
              </li>
              <li>
                <i className="fas fa-phone"></i> +213-000-000-000
              </li>
              <li>
                <i className="fas fa-envelope"></i>{" "}
                <a href="mailto:souheibdaoudi@gmail.com" className="text-white">
                Constatalgerie@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-life-ring"></i>{" "}
                <a href="mailto:support@econstat.com" className="text-white">
                Constatalgerie@gmail.com
                </a>
              </li>
              <li>
                <i className="fas fa-info-circle"></i>{" "}
                <Link href="/faq" className="text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <i className="fas fa-comment"></i>{" "}
                <Link href="/live-chat" className="text-white">
                  Live Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Credit */}
          <div className="col-lg-4 col-md-12 text-md-right text-center">
            <h5>Developed By</h5>
            <div>
              <a
                href="https://github.com/souheibdaoudi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
                style={{ textDecoration: "none" }}
              >
                Souheib Daoudi
              </a>
            </div>
            <div>
              <a
                href="https://github.com/souheibdaoudi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white me-2"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/souheib-daoudi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row mt-4">
          <div className="col text-center">
            <p className="mb-0">&copy; 2024 E-constat. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
