// src/App.tsx

import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import CMCLayoutV5 from "./components/CMCLayoutV5";
import CMCLayoutV4 from "./components/CMCLayoutV4";
import { createBrowserRouter, RouterProvider } from "react-router";
import CMCLayoutV3 from "./components/CMCLayoutV3";
import GoldMarketDashboard from "./components/GoldDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CMCLayoutV5 />,
  },
  {
    path: "/v5",
    element: <CMCLayoutV5 />,
  },
  {
    path: "/v3",
    element: <CMCLayoutV3 />,
  },
  {
    path: "/v4",
    element: <CMCLayoutV4 />,
  },
  {
    path: "/v2",
    element: <GoldMarketDashboard />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
