// Delivered by Originkit · stack: nextjs · styling: tailwind
/* eslint-disable */
// @ts-nocheck
"use client";
import DitherReveal from "@/components/originkit/ui/hero-40/dither-reveal";

export function SectionHero({ onStartChat, theme, onToggleTheme }) {
  return (
    <div className={`hero-40 ${theme === "dark" ? "hero-40-dark" : ""}`}>
      <main className="landing">
        <section className="hero" id="home">
          <div className="noise" aria-hidden="true" />

          <div className="dither-layer" aria-hidden="true">
            <DitherReveal image={{ src: "/originkit/hero-40/white-hands.png", alt: "" }} />
          </div>

          <header className="site-header">
            <a className="brand" href="#home" aria-label="Chat App home">
              Chat App
            </a>

            <div className="header-actions">
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={onToggleTheme}
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-label="Toggle light or dark theme"
              >
                <span className="theme-symbol">{theme === "dark" ? "☀" : "☾"}</span>
              </button>

              <button
                type="button"
                className="header-cta"
                onClick={onStartChat}
              >
                Lets start
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </header>

          <section className="hero-content" aria-labelledby="hero-title">
            <p className="eyebrow">Realtime Team Communication</p>
            <h1 id="hero-title">
              <span className="headline-line headline-line-muted">Conversations With Clarity</span>
              <span className="headline-line">and Connections That Flow</span>
            </h1>
            <p className="hero-copy">
              From instant team brainstorms to focused discussions — we bring people together
              <br className="desktop-break" /> with live socket messaging, interactive likes, and effortless mentions.
            </p>
          </section>

          <footer className="hero-footer">
            <p>Every great collaboration begins with a single conversation.</p>
            <div />
            <p>
              Socket.io powered realtime messaging
              <br /> built for high-velocity teams.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
