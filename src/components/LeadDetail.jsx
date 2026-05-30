import { useState } from "react"
import { supabase } from "../utils/supabase"

function LeadDetail({ lead, onClose, onUpdate }) {
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState(lead.notes ? lead.notes.split("||").filter(n => n) : [])
  const [saving, setSaving] = useState(false)

  const addNote = async () => {
    if (!note.trim()) return
    const updatedNotes = [...notes, note.trim()]
    setSaving(true)
    await supabase.from('leads').update({ notes: updatedNotes.join("||") }).eq('id', lead.id)
    setNotes(updatedNotes)
    setNote("")
    setSaving(false)
    onUpdate({ ...lead, notes: updatedNotes.join("||") })
  }

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : "—"
  const statusColor = { new: '#60a5fa', contacted: '#fbbf24', converted: '#34d399', lost: '#f87171' }
  const initials = lead.name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ width: 540 }}>
        <div className="modal-header">
          <span className="modal-title">Lead Details</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Lead info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#a78bfa22', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>{lead.name}</div>
            <div style={{ color: 'var(--muted)', fontSize: 13 }}>{lead.email}</div>
          </div>
          <span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, background: statusColor[lead.status] + '22', color: statusColor[lead.status] }}>
            {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
          </span>
        </div>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '12px' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Source</div>
            <div style={{ color: '#fff', fontWeight: 500 }}>{lead.source}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '12px' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Date</div>
            <div style={{ color: '#fff', fontWeight: 500 }}>{formatDate(lead.created_at)}</div>
          </div>
        </div>

        {/* Notes section */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 10 }}>📝 Notes</div>
          {notes.length === 0 ? (
            <div style={{ color: 'var(--muted)', fontSize: 13, fontStyle: 'italic', marginBottom: 10 }}>No notes yet — add one below!</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10, maxHeight: 160, overflowY: 'auto' }}>
              {notes.map((n, i) => (
                <div key={i} style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 8, padding: '10px 12px', fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>
                  {n}
                </div>
              ))}
            </div>
          )}

          {/* Add note */}
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Add a note..."
              onKeyDown={e => e.key === 'Enter' && addNote()}
              style={{ flex: 1, padding: '9px 12px', background: 'rgba(255,255,255,0.07)', border: '1px solid var(--border)', borderRadius: 8, color: '#fff', fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
            />
            <button className="btn-primary" onClick={addNote} disabled={saving} style={{ padding: '9px 16px' }}>
              {saving ? "..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadDetail
