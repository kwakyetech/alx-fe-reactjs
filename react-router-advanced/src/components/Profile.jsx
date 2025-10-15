import { Link, Routes, Route, Navigate } from 'react-router-dom'

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>
      <hr />
      <Routes>
        <Route index element={<Navigate to="details" replace />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  )
}

export function ProfileDetails() {
  return (
    <div>
      <h3>Profile Details</h3>
      <p>Name: Jane Doe</p>
      <p>Email: jane@example.com</p>
    </div>
  )
}

export function ProfileSettings() {
  return (
    <div>
      <h3>Profile Settings</h3>
      <p>Notification: Enabled</p>
      <p>Theme: Light</p>
    </div>
  )
}