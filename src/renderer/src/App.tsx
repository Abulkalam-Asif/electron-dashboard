import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './screens/login/Login'
import Dashboard from './screens/dashboard/Dashboard'
// import Register from "./screens/register/Register";
import Location from './screens/location/Location'
import AttendanceDevices from './screens/attendanceDevices/AttendanceDevices'
import Settings from './screens/settings/Settings'
import PrivateRoute from './components/privateRoute/PrivateRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/location"
          element={
            <PrivateRoute>
              <Location />
            </PrivateRoute>
          }
        />

        <Route
          path="/attendance-devices"
          element={
            <PrivateRoute>
              <AttendanceDevices />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
