import { useState, useEffect } from "react"
import { supabase } from "../utils/supabase"
import Sidebar from "../components/Sidebar"

function FollowUps() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .in('status', ['new', 'contacted'])
      .order('created_at', { ascending: true })
    setLeads(data || [])
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id)
    if (!error) setLeads(leads.map(l => l.id === id ? { ...l, status } : l))
  }

  const statusColor = { new: '#60a5fa', contacted: '#fbbf24', converted: '#34d399', lost: '#f87171' }

  return (
    <div className="layout">
      <div className="glass-bg" />
      <Sidebar activePage="followups" />
      <main className="main">
        <div className="header">
          <div>
            <h1>Follow-ups</h1>
            <p className="subtitle">Leads that need your attention</p>
          </div>
        </div>

        {loading ? (
          <div className="empty"><div className="empty-icon">⏳</div><p>Loading...</p></div>
        ) : leads.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🎉</div>
            <p>No pending follow-ups!</p>
          </div>
        ) : (
          <div className="followup-list">
            {leads.map(l => (
              <div className="followup-card" key={l.id}>
                <div className="followup-left">
                  <div className="avatar" style={{ background: '#a78bfa22', color: '#a78bfa', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                    {l.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <div className="followup-name">{l.name}</div>
                    <div className="followup-email">{l.email}</div>
                    <div className="followup-source">📍 {l.source}</div>
                  </div>
                </div>
                <div className="followup-right">
                  <span className="badge-pill" style={{ background: statusColor[l.status] + '22', color: statusColor[l.status] }}>
                    {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                  </span>
                  <div className="followup-actions">
                    <button className="action-pill contacted" onClick={() => updateStatus(l.id, 'contacted')}>📞 Mark Contacted</button>
                    <button className="action-pill converted" onClick={() => updateStatus(l.id, 'converted')}>✅ Mark Converted</button>
                    <button className="action-pill lost" onClick={() => updateStatus(l.id, 'lost')}>❌ Mark Lost</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default FollowUps
