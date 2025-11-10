// src/App.tsx

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { PageLayout } from "./components/CMCLayout";

function App() {

  return (
    <AuthProvider>

      <PageLayout children={null}></PageLayout>

    </AuthProvider>
  );
}

export default App;
