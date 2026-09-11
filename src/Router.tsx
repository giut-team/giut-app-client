import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage";
import { StudentVerificationPage } from "./pages/StudentVerification/StudentVerificationPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<StudentVerificationPage />} path="/student-verification" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
