import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  useGetOrganizations,
  useDeleteOrganization,
} from "../../utils/useOrganizationMutations.ts";
import { usePagination } from "../../hooks/usePagination.ts";
import PaginationControls from "../common/PaginationControls/PaginationControls.tsx";
import CustomTableRow from "../common/CustomTableRow/CustomTableRow.tsx";
import TableActionButtons from "../common/TableActionButtons/TableActionButtons.tsx";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner.tsx";
import ErrorPage from "../common/ErrorPage/ErrorPage.tsx";

function Organizations() {
  const { currentPage, handleNextPage, handlePreviousPage } = usePagination();
  const {
    data: organizations,
    isLoading,
    isError,
  } = useGetOrganizations(currentPage, 5, "users");

  const deleteOrg = useDeleteOrganization();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <Box sx={{ maxWidth: 1000, margin: "2rem auto" }}>
      <TableContainer component={Paper}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h6">Organizations</Typography>
          <Button
            component={Link}
            to="/organizations/create"
            variant="contained"
          >
            Create Organization
          </Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Acronym</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell># of Users</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations?.data.map((org) => (
              <CustomTableRow
                key={org.id}
                cells={[
                  org.id,
                  org.name,
                  org.acronym,
                  org.country,
                  org?.project ? org.project : "N/A",
                  org.users ? org.users.length : 0,
                ]}
                actions={
                  <TableActionButtons
                    editLink={`/organizations/${org.id}/edit`}
                    onDelete={() => deleteOrg.mutate(org.id)}
                  />
                }
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationControls
        currentPage={currentPage}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        disablePrevious={currentPage === 1}
        disableNext={currentPage === organizations?.pages}
        totalPages={organizations?.pages || 1}
      />
    </Box>
  );
}

export default Organizations;
