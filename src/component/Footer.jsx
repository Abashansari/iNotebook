import React from 'react'

export default function Footer() {
    return (
        <footer className="footer has-background-white has-shadow mt-6">
            <div className="content has-text-centered">
                <hr style={{ height: "2px", backgroundColor: "#dbdbdb", border: "none", marginBottom: "1.5rem" }} />

                <p className="is-size-4 has-text-weight-bold has-text-link-dark mb-2">
                    <span className="has-text-primary">my</span><span className="has-text-dark">Note</span><span className="has-text-warning">Book</span>
                </p>

                <p className="is-size-6 has-text-grey-dark">
                    Created by Abash Ansari — Organize your thoughts, save your notes, stay productive.
                </p>

                <p className="is-size-7 has-text-grey mt-4">
                    &copy; {new Date().getFullYear()} myNoteBook. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
