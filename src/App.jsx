import { useState, useEffect } from "react"
import { supabase } from "./utils/supabase"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import FollowUps from "./pages/FollowUps"
import Settings from "./pages/Settings"
import "./App.css"

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState("dashboard")

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    const handleHash = () => {
      const hash = window.location.hash.replace("#", "") || "dashboard"
      setPage(hash)
    }
    handleHash()
    window.addEventListener("hashchange", handleHash)

    return () => {
      subscription.unsubscribe()
      window.removeEventListener("hashchange", handleHash)
    }
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0f1117', color: '#fff', fontSize: 18 }}>
      Loading...
    </div>
  )

  if (!session) return <Login onLogin={() => setSession(true)} />

  return (
    <div className="app">
      {page === "dashboard" && <Dashboard />}
      {page === "analytics" && <Analytics />}
      {page === "followups" && <FollowUps />}
      {page === "settings" && <Settings />}
    </div>
  )
}

export default App
