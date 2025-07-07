import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Menu from "./components/common/Menu";
import Projects from "./components/Projects/Projects.tsx";
import CreateProjectPage from "./components/Projects/CreateProjectPage.tsx";
import EditProjectPage from "./components/Projects/EditProjectPage.tsx";
import Organizations from "./components/Organizations/Organizations.tsx";
import CreateOrganizationPage from "./components/Organizations/CreateOrganizationPage.tsx";
import EditOrganizationPage from "./components/Organizations/EditOrganizationPage.tsx";
import ExercisePage from "./components/Exercise/ExercisePage.tsx";
import Users from "./components/Users/Users.tsx";
import CreateUserPage from "./components/Users/CreateUserPage.tsx";
import EditUserPage from "./components/Users/EditUserPage.tsx";
import Statistics from "./components/Statistics/Statistics.tsx";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />}/>
          <Route path="organizations">
            <Route index element={<Organizations />} />
            <Route path="create" element={<CreateOrganizationPage />} />
            <Route path=":id/edit" element={<EditOrganizationPage />} />
          </Route>
          <Route path="projects">
            <Route index element={<Projects />} />
            <Route path="create" element={<CreateProjectPage />} />
            <Route path=":id/edit" element={<EditProjectPage />} />
          </Route>
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="create" element={<CreateUserPage />} />
            <Route path=":id/edit" element={<EditUserPage />} />
          </Route>
          <Route path="statistics" element={<Statistics />} />
          <Route path="exercise" element={<ExercisePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
