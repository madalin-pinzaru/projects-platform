import {
  useGetProjects,
  useDeleteProject,
} from "../../utils/useProjectMutations";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import PaginationControls from "../common/PaginationControls/PaginationControls";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner.tsx";
import ErrorPage from "../common/ErrorPage/ErrorPage.tsx";
import TableActionButtons from "../common/TableActionButtons/TableActionButtons.tsx";
import CustomTableRow from "../common/CustomTableRow/CustomTableRow";

function Projects() {
  const { currentPage, handleNextPage, handlePreviousPage } = usePagination();
  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjects(currentPage, 5, "organizations");
  const deleteProject = useDeleteProject();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Acronym", key: "acronym" },
    { label: "Description", key: "description" },
    { label: "# Organizations", key: "organizationsCount" },
    { label: "Actions", key: "actions" },
  ];

  return (
    <Box sx={{ maxWidth: 1000, margin: "2rem auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6">Projects</Typography>
        <Button
          component={Link}
          to="/projects/create"
          variant="contained"
          data-testid="create-project-btn"
        >
          Create Project
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {projects?.data?.map((project) => (
            <CustomTableRow
              key={project.id}
              cells={[
                project.id,
                project.name,
                project.acronym,
                project.description,
                project.organizations?.length ?? 0,
              ]}
              actions={
                <TableActionButtons
                  editLink={`/projects/${project.id}/edit`}
                  onDelete={() => deleteProject.mutate(project.id)}
                />
              }
            />
          ))}
        </TableBody>
      </Table>
      <PaginationControls
        currentPage={currentPage}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        disablePrevious={currentPage === 1}
        disableNext={currentPage === projects?.pages}
        totalPages={projects?.pages || 1}
      />
    </Box>
  );
}

export default Projects;
