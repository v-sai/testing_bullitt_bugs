import { createBrowserRouter } from "react-router-dom";
import MapIssue from "./MapIssue/MapIssue.jsx";
import SocialShareIssue from "./SocialShareIssue/SocialShareIssue.jsx";
import List from "./SocialShareIssue/List.jsx";

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
    path: "/sessions",
    element: <List />,
  },
  {
    path: "/sessions/:id",
    element: <SocialShareIssue />
  },
]);

export default router;
