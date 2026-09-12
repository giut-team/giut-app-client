import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { ApplicationDetailPage } from "./pages/MyTeam/ApplicationDetailPage/ApplicationDetailPage";
import { MyTeamPage } from "./pages/MyTeam/MyTeamPage/MyTeamPage";
import { ManageApplicationsPage } from "./pages/MyTeam/ManageApplicationsPage/ManageApplicationsPage";
import { PositionTeamsPage } from "./pages/PositionTeams/PositionTeamsPage/PositionTeamsPage";
import { StudentVerificationPage } from "./pages/StudentVerification/StudentVerificationPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<HomePage />} path="/home" />
        <Route element={<PositionTeamsPage />} path="/position-teams" />
        <Route element={<MyTeamPage />} path="/my-team" />
        <Route
          element={<ManageApplicationsPage />}
          path="/my-team/applications"
        />
        <Route
          element={<ApplicationDetailPage />}
          path="/my-team/applications/:applicantId"
        />
        <Route element={<StudentVerificationPage />} path="/student-verification" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
