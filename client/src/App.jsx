import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import Layout from "./Layout";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import { AppProvider } from "./context/AppContext";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
