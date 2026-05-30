import { useState, useEffect } from "react"
import { supabase } from "../utils/supabase"
import Sidebar from "../components/Sidebar"

const COUNTRY_CODES = [
  { code: "+251", country: "🇪🇹 Ethiopia" },
  { code: "+1", country: "🇺🇸 USA" },
  { code: "+44", country: "🇬🇧 UK" },
  { code: "+49", country: "🇩🇪 Germany" },
  { code: "+33", country: "🇫🇷 France" },
  { code: "+971", country: "🇦🇪 UAE" },
  { code: "+966", country: "🇸🇦 Saudi Arabia" },
  { code: "+254", country: "🇰🇪 Kenya" },
  { code: "+234", country: "🇳🇬 Nigeria" },
  { code: "+27", country: "🇿🇦 South Africa" },
  { code: "+20", country: "🇪🇬 Egypt" },
  { code: "+91", country: "🇮🇳 India" },
  { code: "+86", country: "🇨🇳 China" },
  { code: "+81", country: "🇯🇵 Japan" },
  { code: "+55", country: "🇧🇷 Brazil" },
  { code: "+61", country: "🇦🇺 Australia" },
]

function Settings() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", countryCode: "+251" })
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => { loadSettings() }, [])

  const loadSettings = async () => {
    const { data } = await supabase.from('settings').select('*').limit(1)
    if (data && data.length > 0) {
      setForm({
        name: data[0].name || "",
        email: data[0].email || "",
        phone: data[0].phone || "",
        countryCode: data[0].country_code || "+251"
      })
    }
  }

  const handleSave = async () => {
    setLoading(true)
    const { data: existing } = await supabase.from('settings').select('id').limit(1)
    if (existing && existing.length > 0) {
      await supabase.from('settings').update({
        name: form.name, email: form.email, phone: form.phone, country_code: form.countryCode
      }).eq('id', existing[0].id)
    } else {
      await supabase.from('settings').insert([{
        name: form.name, email: form.email, phone: form.phone, country_code: form.countryCode
      }])
    }
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="layout">
      <div className="glass-bg" />
      <Sidebar activePage="settings" />
      <main className="main">
        <div className="header">
          <div>
            <h1>Settings</h1>
            <p className="subtitle">Manage your CRM preferences</p>
          </div>
        </div>

        <div className="settings-grid">
          <div className="chart-card">
            <h3 className="chart-title">👤 Profile</h3>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <select
                value={form.countryCode}
                onChange={e => setForm({ ...form, countryCode: e.target.value })}
                style={{ marginBottom: 8 }}
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code}>{c.country} ({c.code})</option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="912345678"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <button
              className="btn-primary"
              onClick={handleSave}
              style={{ marginTop: 8, width: '100%' }}
              disabled={loading}
            >
              {loading ? "Saving..." : saved ? "✅ Saved!" : "Save Changes"}
            </button>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">🔔 Notifications</h3>
            <div className="settings-toggle">
              <span>Email alerts for new leads</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="settings-toggle">
              <span>Weekly summary report</span>
              <input type="checkbox" />
            </div>
            <div className="settings-toggle">
              <span>Follow-up reminders</span>
              <input type="checkbox" defaultChecked />
            </div>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">🗃️ Data</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>Manage your CRM data</p>
            <button className="btn-ghost" style={{ width: '100%', marginBottom: 10 }}>📤 Export Leads (CSV)</button>
            <button className="btn-ghost" style={{ width: '100%', color: '#f87171', borderColor: '#f87171' }}>🗑️ Clear All Leads</button>
          </div>

          <div className="chart-card">
            <h3 className="chart-title">ℹ️ About</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.7 }}>
              LeadCRM v1.0<br/>
              Built with React + Supabase<br/>
              © 2026 Hana G
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings
