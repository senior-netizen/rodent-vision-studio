import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="site-footer__row">
          <p>Rodent Inc. — infrastructure systems company.</p>
          <div className="site-footer__links">
            <Link to="/projects">Projects</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
