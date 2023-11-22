import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
