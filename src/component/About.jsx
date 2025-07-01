import React from 'react'

export default function About() {
  return (
    <div>
      <div className="container py-5">
  <div className="card shadow-sm border-0">
    <div className="card-body">
      <h1 className="mb-4 text-primary">
        About  <span className="has-text-primary">my</span><span className="has-text-dark">Note</span><span className="has-text-warning">Book</span>

      </h1>

      <p className="fs-5">
        <b>myNoteBook</b> is a secure, lightweight, and intuitive digital notebook designed
        to help you stay organized. Whether you're tracking ideas, managing tasks, or just jotting
        down thoughts, myNoteBook gives you a fast and focused experience across all your devices.
      </p>

      <p className="fs-5">Key features include:</p>

      <ul className="fs-5 list-unstyled ps-3">
        <li>📝 Create, edit, and delete notes easily</li>
        <li>🔒 Secure user authentication & protected access</li>
        <li>☁️ Cloud syncing for safe and easy access</li>
        <li>🎯 Clean, distraction-free interface</li>
      </ul>

    </div>
  </div>
</div>

    </div>
  )
}
