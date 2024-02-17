import { useState } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<Login />} />
      {/* <Route path="/home" element={<Home />} /> */}
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <Registration /> */}
    </>
  );
}

export default App;
