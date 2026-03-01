import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CatalogProvider } from "./data/catalog";

export default function App() {
  return (
    <CatalogProvider>
      <RouterProvider router={router} />
    </CatalogProvider>
  );
}
