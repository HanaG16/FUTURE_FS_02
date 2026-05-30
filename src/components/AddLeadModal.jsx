import { useState } from "react"

function AddLeadModal({ onSave, onClose }) {
  const [form, setForm] = useState({
    name: "", email: "", source: "Contact Form",
    status: "new", note: "", date: new Date().toISOString().split("T")[0]
  })

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = () => {
    if (!form.name || !form.email) return alert("Name and email are required!")
    onSave(form)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Add New Lead</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Full Name *</label>
            <input name="name" placeholder="John Smith" value={form.name} onChange={handle} />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input name="email" placeholder="john@example.com" value={form.email} onChange={handle} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Source</label>
            <select name="source" value={form.source} onChange={handle}>
              <option>Contact Form</option>
              <option>Instagram</option>
              <option>Referral</option>
              <option>LinkedIn</option>
              <option>Walk-in</option>
              <option>Facebook</option>
              <option>Twitter/X</option>
              <option>TikTok</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handle}>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handle} />
        </div>

        <div className="form-group">
          <label>Note</label>
          <textarea name="note" placeholder="Any notes about this lead..." value={form.note} onChange={handle} />
        </div>

        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={submit}>Save Lead</button>
        </div>
      </div>
    </div>
  )
}

export default AddLeadModal
