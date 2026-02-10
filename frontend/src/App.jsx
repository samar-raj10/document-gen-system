import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { Lor } from "./pages/Lor";
import { Bonafide } from "./pages/Bonafide";
import { Nodues } from "./pages/Nodues";
import { Character } from "./pages/Character";
import { Profile } from "./pages/Profile";
import { AdminDashboard } from "./pages/AdminDashboard";
import Layout from "./components/Layout";
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <Routes>
      {/* Login Route - No Layout/Sidebar */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Dashboard - Separate Layout */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* Authenticated Routes - With Layout/Sidebar */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/request/lor" element={<Lor />} />
        <Route path="/request/bonafide" element={<Bonafide />} />
        <Route path="/request/no-dues" element={<Nodues />} />
        <Route path="/request/character" element={<Character />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;


