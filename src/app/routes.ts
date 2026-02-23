import { createBrowserRouter } from "react-router";
import Home from "./components/Home";
import GradeSelection from "./components/GradeSelection";
import SubjectSelection from "./components/SubjectSelection";
import UnitSelection from "./components/UnitSelection";
import MaterialDetail from "./components/MaterialDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/grade-selection",
    Component: GradeSelection,
  },
  {
    path: "/subject-selection/:grade",
    Component: SubjectSelection,
  },
  {
    path: "/unit-selection/:grade/:subject",
    Component: UnitSelection,
  },
  {
    path: "/material/:grade/:subject/:unit",
    Component: MaterialDetail,
  },
]);
