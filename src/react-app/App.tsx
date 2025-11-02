// src/App.tsx

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import cloudflareLogo from "./assets/Cloudflare_Logo.svg";
import honoLogo from "./assets/hono.svg";
import "./App.css";
import Layout from "./components/Layout";
import Index from "./pages";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("unknown");

  return (
    <AuthProvider>

      <Index></Index>

    </AuthProvider>
  );
}

export default App;
