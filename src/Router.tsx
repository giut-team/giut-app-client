import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { ClosingContestsPage } from "./pages/Contests/ClosingContestsPage/ClosingContestsPage";
import { ContestsPage } from "./pages/Contests/ContestsPage";
import { ContestDetailPage } from "./pages/Contests/ContestDetailPage/ContestDetailPage";
import { RecruitingTeamsPage } from "./pages/Contests/RecruitingTeamsPage/RecruitingTeamsPage";
import { TeamCreationPage } from "./pages/Contests/TeamCreationPage/TeamCreationPage";
import { TeamCreationProvider } from "./pages/Contests/TeamCreationPage/TeamCreationContext";
import { PopularContestsPage } from "./pages/Contests/PopularContestsPage/PopularContestsPage";
import { LoginPage } from "./pages/Login/LoginPage";
import { MatchedTeamsPage } from "./pages/MatchedTeams/MatchedTeamsPage";
import { ApplicationDetailPage } from "./pages/MyTeam/ApplicationDetailPage/ApplicationDetailPage";
import { MyTeamPage } from "./pages/MyTeam/MyTeamPage/MyTeamPage";
import { ManageApplicationsPage } from "./pages/MyTeam/ManageApplicationsPage/ManageApplicationsPage";
import { MyApplicationPage } from "./pages/MyTeam/MyApplicationPage/MyApplicationPage";
import { NotificationsPage } from "./pages/Notifications/NotificationsPage";
import { PositionTeamsPage } from "./pages/PositionTeams/PositionTeamsPage";
import { StudentVerificationPage } from "./pages/StudentVerification/StudentVerificationPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<HomePage />} path="/home" />
        <Route element={<ClosingContestsPage />} path="/closing-contests" />
        <Route element={<ContestsPage />} path="/contests" />
        <Route element={<ContestDetailPage />} path="/contests/:contestId" />
        <Route
          element={<RecruitingTeamsPage />}
          path="/contests/:contestId/teams"
        />
        <Route
          element={
            <TeamCreationProvider>
              <Outlet />
            </TeamCreationProvider>
          }
          path="/contests/:contestId/teams/create"
        >
          <Route index element={<TeamCreationPage />} />
          <Route element={<TeamCreationPage />} path=":step" />
        </Route>
        <Route element={<PopularContestsPage />} path="/contests/popular" />
        <Route element={<NotificationsPage />} path="/notifications" />
        <Route element={<PositionTeamsPage />} path="/position-teams" />
        <Route element={<MatchedTeamsPage />} path="/matched-teams" />
        <Route element={<MyTeamPage />} path="/my-team" />
        <Route
          element={<MyApplicationPage />}
          path="/my-team/my-application/:applicationStatus?"
        />
        <Route
          element={<ManageApplicationsPage />}
          path="/my-team/applications"
        />
        <Route
          element={<ApplicationDetailPage />}
          path="/my-team/applications/:applicantId"
        />
        <Route
          element={<StudentVerificationPage />}
          path="/student-verification"
        />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
