function StatsBar({ leads }) {
  const count = (status) => leads.filter(l => l.status === status).length

  return (
    <div className="stats">
      <div className="stat-card total">
        <div className="stat-label">Total Leads</div>
        <div className="stat-num">{leads.length}</div>
      </div>
      <div className="stat-card new">
        <div className="stat-label">New</div>
        <div className="stat-num">{count("new")}</div>
      </div>
      <div className="stat-card contacted">
        <div className="stat-label">Contacted</div>
        <div className="stat-num">{count("contacted")}</div>
      </div>
      <div className="stat-card converted">
        <div className="stat-label">Converted</div>
        <div className="stat-num">{count("converted")}</div>
      </div>
    </div>
  )
}

export default StatsBar
