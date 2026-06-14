import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`;

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="site-brand">
        <span className="logo-icon">⟨/⟩</span>
        <span className="logo-text">Api<b>Testing</b></span>
        <span className="logo-sep">|</span>
        <span className="logo-sub">JS API Test Runner</span>
      </div>

      <nav className="site-nav">
        <NavLink to="/" className={linkClass} end>
          Tester
        </NavLink>
        <NavLink to="/docs" className={linkClass}>
          Docs
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </nav>
    </header>
  );
}
