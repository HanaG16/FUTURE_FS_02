import { useState, useEffect } from "react"
import LeadTable from "../components/LeadTable"
import AddLeadModal from "../components/AddLeadModal"
import StatsBar from "../components/StatsBar"
import Sidebar from "../components/Sidebar"
import { supabase } from "../utils/supabase"

function Dashboard() {
  const [leads, setLeads] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  // Load leads from Supabase on startup
  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching leads:', error.message)
    } else {
      setLeads(data)
    }
    setLoading(false)
  }

  const filtered = leads.filter(l => {
    const matchFilter = filter === "all" || l.status === filter
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
                        l.email.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
    if (!error) setLeads(leads.map(l => l.id === id ? { ...l, status } : l))
  }

  const addLead = async (lead) => {
    const { data, error } = await supabase
      .from('leads')
      .insert([{ name: lead.name, email: lead.email, source: lead.source, status: lead.status, notes: lead.note || '' }])
      .select()
    if (!error) setLeads([data[0], ...leads])
    setShowModal(false)
  }

  const deleteLead = async (id) => {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)
    if (!error) setLeads(leads.filter(l => l.id !== id))
  }

  return (
    <div className="layout">
      <div className="glass-bg" />
      <Sidebar />
      <main className="main">
        <div className="header">
          <div>
            <h1>Leads</h1>
            <p className="subtitle">Manage your client pipeline</p>
          </div>
          <button className="btn-primary" onClick={() => { console.log('clicked!'); setShowModal(true); }}>+ Add Lead</button>
        </div>

        <StatsBar leads={leads} />

        <div className="toolbar">
          <div className="search-box">
            <span>🔍</span>
            <input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {["all","new","contacted","converted"].map(f => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="empty"><div className="empty-icon">⏳</div><p>Loading leads...</p></div>
        ) : (
          <LeadTable leads={filtered} onStatusChange={updateStatus} onDelete={deleteLead} />
        )}

        {showModal && <AddLeadModal onSave={addLead} onClose={() => setShowModal(false)} />}
      </main>
    </div>
  )
}

export default Dashboard
