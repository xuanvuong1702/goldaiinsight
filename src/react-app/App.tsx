// src/App.tsx

import "./App.css";
import Index from "./pages";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (
    <AuthProvider>

      <Index></Index>

    </AuthProvider>
  );
}

export default App;
