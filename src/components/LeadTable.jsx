function LeadTable({ leads, onStatusChange, onDelete }) {
  const colors = ["#6c63ff","#f59e0b","#10b981","#3b82f6","#f43f5e","#8b5cf6","#06b6d4"]
  const colorFor = (name) => colors[name.charCodeAt(0) % colors.length]
  const initials = (name) => name.split(" ").map(n => n[0]).join("").toUpperCase()
  const formatDate = (d) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

  if (!leads) return (
    <div className="empty">
      <div className="empty-icon">🔍</div>
      <p>No leads found</p>
    </div>
  )

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Source</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(l => (
            <tr key={l.id}>
              <td>
                <div className="lead-name-cell">
                  <div className="avatar" style={{ background: colorFor(l.name) + "22", color: colorFor(l.name) }}>
                    {initials(l.name)}
                  </div>
                  <div>
                    <div className="lead-name">{l.name}</div>
                    <div className="lead-email">{l.email}</div>
                  </div>
                </div>
              </td>
              <td><span className="source-tag">{l.source}</span></td>
              <td>
                <select
                  value={l.status}
                  onChange={e => onStatusChange(l.id, e.target.value)}
                  className={`status-select badge ${l.status}`}
                >
                  {["new","contacted","converted","lost"].map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </td>
              <td className="date-cell">{formatDate(l.date)}</td>
              <td>
                <button className="icon-btn" onClick={() => onDelete(l.id)} title="Delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeadTable
