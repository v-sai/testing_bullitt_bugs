import { createBrowserRouter } from "react-router-dom";
import MapIssue from "./MapIssue/MapIssue.jsx"
import SocialShareIssue from "./SocialShareIssue/SocialShareIssue.jsx"

const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Bullitt Bugs testing</div>,
    },
    {
      path: "/map",
      element: <MapIssue />,
    },
    {
      path: "/sahre",
      element: <SocialShareIssue />,
    },
  ]);

  export default router