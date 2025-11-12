// src/App.tsx

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { PageLayout } from "./components/CMCLayout";
import Dashboards1 from "./components/Dashboard1";
import CMCLayoutV2 from "./components/CMCLayoutV2";
import CMCLayoutV3 from "./components/CMCLayoutV3";
import GoldMarketApp from "./components/CMCLayoutV4";
import CMCLayoutV5 from "./components/CMCLayoutV5";

function App() {

  return (
    <AuthProvider>

      <CMCLayoutV5 ></CMCLayoutV5>

    </AuthProvider>
  );
}

export default App;
