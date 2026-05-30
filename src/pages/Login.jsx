import { useState } from "react"
import { supabase } from "../utils/supabase"

function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    if (!email || !password) { setError("Please enter email and password"); return }
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError("Invalid email or password. Try again.")
    } else {
      onLogin()
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="glass-bg" />
      <div className="login-card">
        <div className="login-logo">Lead<span>CRM</span></div>
        <p className="login-subtitle">Sign in to your dashboard</p>

        {error && <div className="login-error">{error}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        <button
          className="btn-primary"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', marginTop: 8, padding: '12px' }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  )
}

export default Login
