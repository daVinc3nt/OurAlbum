import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Timeline } from "./screens/Timeline";
import { AddMemory } from "./screens/AddMemory";
import { MilestoneDetail } from "./screens/MilestoneDetail";
import { Login } from "./screens/Login";
import { ProtectedLayout } from "./components/ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <AppLayout><Timeline /></AppLayout>,
      },
      {
        path: "/add",
        element: <AppLayout><AddMemory /></AppLayout>,
      },
      {
        path: "/milestone/:id",
        element: <AppLayout><MilestoneDetail /></AppLayout>, // Fixed closing tag
      },
    ],
  },
]);
