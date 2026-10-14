
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';

import './Sidebar.css';

const navItems = [
  { label: 'Dashboard', Icon: DashboardIcon },
  { label: 'History', Icon: ManageSearchIcon },
  { label: 'Admin', Icon: AdminPanelSettingsIcon },
  { label: 'Logout', Icon: LogoutIcon },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <ArticleIcon  sx={{fontsize : 20} } />
        </div>

        <span>Resume </span>
      </div>

      <nav
        className="sidebar-navigation"
        aria-label="Main navigation"
      >
        {navItems.map(({ label, Icon }) => (
          <button
            type="button"
            key={label}
            className={`sidebar-nav-item ${
              activePage === label ? 'selected' : ''
            }`}
            onClick={() => onNavigate(label)}
            aria-current={
              activePage === label ? 'page' : undefined
            }
          >
            <Icon
              className="sidebar-nav-icon"
              aria-hidden="true"
            />

            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        SMARTER HIRING, SIMPLIFIED
      </div>
    </aside>
  );
}
