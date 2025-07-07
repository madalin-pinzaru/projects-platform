import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../utils/usersApi";
import { getOrganizations } from "../../utils/organizationsApi";
import { getProjects } from "../../utils/projectsApi";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Box, Typography, Paper } from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

export default function Statistics() {
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users", 1, undefined],
    queryFn: () => getUsers(1),
  });

  const {
    data: orgsData,
    isLoading: orgsLoading,
    isError: orgsError,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations(1),
  });

  const {
    data: projectsData,
    isLoading: projectsLoading,
    isError: projectsError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(1, 100),
  });

  if (usersLoading || orgsLoading || projectsLoading) return <LoadingSpinner />;
  if (usersError || orgsError || projectsError) return <ErrorPage />;

  const orgs = orgsData?.data || [];
  const users = usersData?.data || [];
  const usersPerOrg = orgs.map(
    (org) => users.filter((u) => u.organizationId === org.id).length,
  );
  const pieData = {
    labels: orgs.map((org) => org.name),
    datasets: [
      {
        data: usersPerOrg,
        backgroundColor: [
          "#0088FE",
          "#00C49F",
          "#FFBB28",
          "#FF8042",
          "#A28BFE",
          "#FF6699",
          "#33CC99",
          "#FF6666",
        ],
      },
    ],
  };

  const projects = (projectsData?.data || []).map((project) => ({
    ...project,
    organizations: orgs.filter((org) => org.project === project.id),
  }));

  const barData = {
    labels: projects.map((p) => p.name),
    datasets: [
      {
        label: "Organizations",
        data: projects.map((p) => p.organizations.length),
        backgroundColor: "#9794e0",
      },
    ],
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Users per Organization
        </Typography>
        <Box sx={{ width: 600, height: 500, mx: "auto" }}>
          <Pie data={pieData} />
        </Box>
      </Paper>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Organizations per Project
        </Typography>
        <Bar
          data={barData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
              },
            },
          }}
        />
      </Paper>
    </Box>
  );
}
