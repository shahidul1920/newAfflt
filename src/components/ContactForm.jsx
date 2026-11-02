"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General question",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <>
      {!submitted ? (
        <form id="lr-contact-form" onSubmit={handleSubmit}>
          <div className="p-field">
            <label htmlFor="lrname">Your name</label>
            <input
              type="text"
              id="lrname"
              name="name"
              placeholder="Jane Doe"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="p-field">
            <label htmlFor="lremail">Email</label>
            <input
              type="email"
              id="lremail"
              name="email"
              placeholder="you@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="p-field">
            <label htmlFor="lrtopic">Reason for contact</label>
            <select
              id="lrtopic"
              name="topic"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            >
              <option>General question</option>
              <option>Story tip</option>
              <option>Correction</option>
              <option>Editorial / press</option>
              <option>Something else</option>
            </select>
          </div>

          <div className="p-field">
            <label htmlFor="lrmessage">Message</label>
            <textarea
              id="lrmessage"
              name="message"
              placeholder="How can we help?"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button className="p-btn" type="submit">
            Send message
          </button>
        </form>
      ) : (
        <div id="lr-contact-thanks" className="p-thanks">
          <h3>Thanks — your message is on its way.</h3>
          <p>We&apos;ve received your note and aim to reply within two business days.</p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", email: "", topic: "General question", message: "" });
            }}
            className="p-btn"
            style={{ marginTop: "16px", padding: "10px 18px", fontSize: "14px" }}
          >
            Send another message
          </button>
        </div>
      )}
    </>
  );
}
