import React from 'react'

const footer = () => {
  return (
     <footer className="bg-[#695057] text-white">
      <div className="max-w-7xl mx-auto px-8 py-10 grid md:grid-cols-3 gap-13">
        <div>
          <h3 className="text-xl font-bold mb-3">Curex</h3>
          <p className="text-white">
            CUREX is dedicated to providing efficient healthcare staffing solutions during disasters, ensuring that medical professionals are quickly deployed to where they are needed most.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <p>Email: info@curex.org</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      <div className="bg-[#695057] text-white text-center py-4 text-sm">
        © 2026 Curex. All rights reserved.
      </div>
    </footer>
  )
}

export default footer