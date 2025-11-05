// src/App.tsx

import "./App.css";
import Index from "./pages";
import { AuthProvider } from "./context/AuthContext";
import Dashboards1 from "./components/Dashboard1";

function App() {

  return (
    <AuthProvider>

      <Dashboards1></Dashboards1>

    </AuthProvider>
  );
}

export default App;
