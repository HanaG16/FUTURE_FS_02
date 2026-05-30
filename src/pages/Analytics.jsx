import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { supabase } from "../utils/supabase"
import Sidebar from "../components/Sidebar"

const COLORS = {
  new: "#60a5fa",
  contacted: "#fbbf24",
  converted: "#34d399",
  lost: "#f87171"
}

function Analytics() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    const { data } = await supabase.from('leads').select('*')
    setLeads(data || [])
    setLoading(false)
  }

  // Pie chart data — leads by status
  const statusData = ["new", "contacted", "converted", "lost"].map(status => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: leads.filter(l => l.status === status).length,
    color: COLORS[status]
  })).filter(d => d.value > 0)

  // Bar chart data — leads by source
  const sources = [...new Set(leads.map(l => l.source))]
  const sourceData = sources.map(source => ({
    source,
    count: leads.filter(l => l.source === source).length
  }))

  // Conversion rate
  const conversionRate = leads.length > 0
    ? Math.round((leads.filter(l => l.status === "converted").length / leads.length) * 100)
    : 0

  return (
    <div className="layout">
      <div className="glass-bg" />
      <Sidebar activePage="analytics" />
      <main className="main">
        <div className="header">
          <div>
            <h1>Analytics</h1>
            <p className="subtitle">Overview of your lead pipeline</p>
          </div>
        </div>

        {loading ? (
          <div className="empty"><div className="empty-icon">⏳</div><p>Loading analytics...</p></div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="stats" style={{ marginBottom: 28 }}>
              <div className="stat-card total">
                <div className="stat-label">Total Leads</div>
                <div className="stat-num">{leads.length}</div>
              </div>
              <div className="stat-card converted">
                <div className="stat-label">Conversion Rate</div>
                <div className="stat-num">{conversionRate}%</div>
              </div>
              <div className="stat-card new">
                <div className="stat-label">Pending Leads</div>
                <div className="stat-num">{leads.filter(l => l.status === "new").length}</div>
              </div>
              <div className="stat-card contacted">
                <div className="stat-label">In Progress</div>
                <div className="stat-num">{leads.filter(l => l.status === "contacted").length}</div>
              </div>
            </div>

            {/* Charts row */}
            <div className="charts-row">

              {/* Pie chart */}
              <div className="chart-card">
                <h3 className="chart-title">Leads by Status</h3>
                {statusData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: 'rgba(20,15,40,0.9)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff' }}
                      />
                      <Legend
                        formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="empty"><div className="empty-icon">📊</div><p>No data yet</p></div>
                )}
              </div>

              {/* Bar chart */}
              <div className="chart-card">
                <h3 className="chart-title">Leads by Source</h3>
                {sourceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={sourceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="source" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ background: 'rgba(20,15,40,0.9)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, color: '#fff' }}
                      />
                      <Bar dataKey="count" fill="#a78bfa" radius={[6,6,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="empty"><div className="empty-icon">📊</div><p>No data yet</p></div>
                )}
              </div>

            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Analytics
