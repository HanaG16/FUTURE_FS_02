import { supabase } from "../utils/supabase"

function Sidebar({ activePage }) {
  const navigate = (page) => { window.location.hash = page }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.hash = ""
  }

  return (
    <aside className="sidebar">
      <div className="logo">Lead<span>CRM</span></div>

      <div className="nav-label">Menu</div>
      <div className={`nav-item ${!activePage || activePage === "dashboard" ? "active" : ""}`} onClick={() => navigate("dashboard")}>
        <span>📋</span> All Leads
      </div>
      <div className={`nav-item ${activePage === "analytics" ? "active" : ""}`} onClick={() => navigate("analytics")}>
        <span>📊</span> Analytics
      </div>
      <div className={`nav-item ${activePage === "followups" ? "active" : ""}`} onClick={() => navigate("followups")}>
        <span>📅</span> Follow-ups
      </div>

      <div className="nav-bottom">
        <div className={`nav-item ${activePage === "settings" ? "active" : ""}`} onClick={() => navigate("settings")}>
          <span>⚙️</span> Settings
        </div>
        <div className="nav-item" onClick={handleLogout} style={{ color: '#f87171' }}>
          <span>🚪</span> Logout
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
