import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/Login/LoginPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<App />} path="/components" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
