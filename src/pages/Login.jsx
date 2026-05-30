import { useState } from "react"
import { supabase } from "../utils/supabase"

function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async () => {
    setError("")
    setSuccess("")

    if (!email || !password) { setError("Please fill in all fields"); return }

    if (isSignUp) {
      if (password !== confirmPassword) { setError("Passwords don't match!"); return }
      if (password.length < 6) { setError("Password must be at least 6 characters"); return }

      setLoading(true)
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setSuccess("Account created! You can now sign in.")
        setIsSignUp(false)
        setPassword("")
        setConfirmPassword("")
      }
    } else {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError("Invalid email or password. Try again.")
      } else {
        onLogin()
      }
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="glass-bg" />
      <div className="login-card">
        <div className="login-logo">Lead<span>CRM</span></div>
        <p className="login-subtitle">{isSignUp ? "Create your account" : "Sign in to your dashboard"}</p>

        {error && <div className="login-error">❌ {error}</div>}
        {success && <div className="login-success">✅ {success}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
        </div>

        {isSignUp && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
          </div>
        )}

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', marginTop: 8, padding: '12px' }}
        >
          {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
        </button>

        <div className="login-toggle">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span onClick={() => { setIsSignUp(!isSignUp); setError(""); setSuccess("") }}>
            {isSignUp ? " Sign In" : " Sign Up"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
