const themes = [
  { id: "light", label: "☀️ Light", },
  { id: "dark", label: "🌙 Dark", },
  { id: "bw", label: "⬛ B&W", },
  { id: "glass", label: "🪟 Glass", },
]

function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div className="theme-switcher">
      {themes.map(t => (
        <button
          key={t.id}
          className={`theme-btn ${theme === t.id ? "active" : ""}`}
          onClick={() => setTheme(t.id)}
          title={t.label}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher
