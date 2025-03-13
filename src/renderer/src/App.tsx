import { Routes, Route } from 'react-router-dom'
import Login from './screens/login/Login'
import Dashboard from './screens/dashboard/Dashboard'
import AttendanceDevices from './screens/attendanceDevices/AttendanceDevices'
import Settings from './screens/settings/Settings'
import PrivateRoute from './components/general/privateRoute/PrivateRoute'
import Location from './screens/location/Location'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
  )
}

export default App
