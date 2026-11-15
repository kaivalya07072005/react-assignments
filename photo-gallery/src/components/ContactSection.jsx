import { useState } from "react";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "Kaivalya",
    phone: "7842465269",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setSubmitted(true);
    setFormData((prev) => ({ ...prev, message: "" }));
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="contact-editorial-section" id="contact">
      {/* Background ambient glowing orbs behind the glass card for true frosted glass refraction */}
      <div className="glass-ambient-container" aria-hidden="true">
        <div className="glass-orb glass-orb-purple"></div>
        <div className="glass-orb glass-orb-pink"></div>
        <div className="glass-orb glass-orb-coral"></div>
      </div>

      <div className="contact-glass-card">
        <div className="contact-editorial-container">
          {/* Left Side: Dramatic Serif Headline */}
          <div className="contact-headline-col">
            <h2 className="contact-huge-title">
              LET'S<br />
              GET IN<br />
              TOUCH
            </h2>
          </div>

          {/* Right Side: Minimalist Underline Form */}
          <div className="contact-form-col">
            <form className="contact-minimal-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name" className="minimal-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="minimal-input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="phone" className="minimal-label">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="minimal-input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="message" className="minimal-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  className="minimal-input minimal-textarea"
                />
              </div>

              <div className="form-submit-row">
                <button type="submit" className="editorial-send-btn" aria-label="Send message">
                  <span>Send</span>
                  <span className="send-arrow">───────&gt;</span>
                </button>

                {submitted && (
                  <span className="submit-success-badge">
                    ✓ Message sent! Thank you, Kaivalya ({formData.phone}).
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Sleek Glassmorphism Card Footer matching the uploaded reference */}
        <div className="contact-card-footer">
          <div className="card-footer-left">
            <span>SHUTTER STORIES © 2026</span>
            <span className="footer-bullet">·</span>
            <span>Curated by Kaivalya</span>
            <span className="footer-bullet">·</span>
            <span className="footer-dim">Direct 7842465269</span>
          </div>

          <div className="card-footer-right">
            <span>Sitemap</span>
            <span className="footer-bullet">·</span>
            <span>Privacy</span>
            <span className="footer-bullet">·</span>
            <span className="footer-badge">OPEN GALLERY</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

