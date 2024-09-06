import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// Reusable NavItem component with PropTypes and default parameters
const NavItem = ({ to, icon, text, isActive = false, dropdownItems = [] }) => {
  return (
    <li className={`nav-item${isActive ? " active" : ""} mt-2`}>
      <Link to={to} className="nav-link d-flex justify-content-between" data-bs-toggle={dropdownItems.length ? "collapse" : ""} data-bs-target={`#${text.replace(/\s+/g, '')}`}>
        <span>
          <span className="sidebar-icon me-2">
            <i className={`fa ${icon}`}></i>
          </span>
          <span className="sidebar-text">{text}</span>
        </span>
        {dropdownItems.length > 0 && (
          <i className="fa fa-chevron-down"></i>
        )}
      </Link>
      {dropdownItems.length > 0 && (
        <ul className="collapse" id={text.replace(/\s+/g, '')}>
          {dropdownItems.map(({ to, icon, text }) => (
            <li key={to} className="nav-item mt-2">
              <Link to={to} className="nav-link d-flex">
                <span className="sidebar-icon me-2">
                  <i className={`fa ${icon}`}></i>
                </span>
                <span className="sidebar-text">{text}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

NavItem.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  dropdownItems: PropTypes.array
};

export default function Sidebar() {
  const { pathname } = useLocation();
  const activeRoute = pathname ? pathname.split("/")[1] : '';

  // Define link data
  const navItems = [
    { to: "/dashboard", icon: "fa-tachometer-alt", text: "Dashboard" },
    { to: "/categories", icon: "fa-tags", text: "Categories" },
    { to: "/posts", icon: "fa-file-alt", text: "Posts" },
    { to: "/sliders", icon: "fa-sliders-h", text: "Sliders" },
    { to: "/faculties", icon: "fa-building", text: "Faculties" },
    { to: "/users", icon: "fa-users", text: "Users" },
    {
      text: "Settings",
      icon: "fa-cogs",
      dropdownItems: [
        { to: "/settings/profile", icon: "fa-user", text: "Profile" },
        { to: "/settings/account", icon: "fa-lock", text: "Account" },
        { to: "/settings/notifications", icon: "fa-bell", text: "Notifications" }
      ]
    }
  ];

  return (
    <div>
      <nav
        id="sidebarMenu"
        className="sidebar d-lg-block bg-tertiary text-white collapse"
        data-simplebar
      >
        <div className="sidebar-inner px-3 pt-3">
          <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
            <div className="collapse-close d-md-none">
              <a
                href="#sidebarMenu"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarMenu"
                aria-controls="sidebarMenu"
                aria-expanded="true"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-times"></i>
              </a>
            </div>
          </div>
          <ul className="nav flex-column pt-3 pt-md-0">
            <li className="nav-item">
              <span className="mt-2 d-flex justify-content-center">
                <span>
                  <span className="sidebar-icon me-2">
                    <i className="fa fa-cogs"></i>
                  </span>
                  <span className="sidebar-text text-center fw-bold ms-2">
                    CMS FACULTIES
                  </span>
                </span>
              </span>
            </li>

            <li role="separator" className="dropdown-divider mt-4 mb-3 border-gray-700"></li>

            {navItems.map(({ to, icon, text, dropdownItems }) => (
              <NavItem
                key={text}
                to={to}
                icon={icon}
                text={text}
                isActive={activeRoute === text.toLowerCase()}
                dropdownItems={dropdownItems}
              />
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
