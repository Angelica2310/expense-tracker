import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LogIn from "./components/LogIn";
import TrackerScreen from "./components/TrackerScreen";
import SignUp from "./components/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/log-in" element={<LogIn />} />

        <Route path="/sign-up" element={<SignUp />} />

        <Route
          path="/tracker-screen"
          element={
            <ProtectedRoute>
              <TrackerScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
