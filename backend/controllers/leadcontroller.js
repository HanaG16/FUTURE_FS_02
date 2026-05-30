const Lead = require('../models/Lead')

// GET all leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 })
    res.json(leads)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// POST create a new lead
const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body)
    const saved = await lead.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// PUT update a lead
const updateLead = async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// DELETE a lead
const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id)
    res.json({ message: 'Lead deleted' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = { getLeads, createLead, updateLead, deleteLead }