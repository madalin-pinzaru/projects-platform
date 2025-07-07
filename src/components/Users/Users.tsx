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
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import TableActionButtons from "../common/TableActionButtons/TableActionButtons";
import EntityTableRow from "../common/CustomTableRow/CustomTableRow";
import { useDeleteUserMutation } from "../../utils/useUsersMutations";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../utils/usersApi";

function useGetUsers(page: number = 1, pageSize?: number, embed?: string) {
  return useQuery({
    queryKey: ["users", page, embed],
    queryFn: () => getUsers(page, pageSize, embed),
  });
}

function Users() {
  const { currentPage, handleNextPage, handlePreviousPage } = usePagination();
  const {
    data: users,
    isLoading,
    isError,
  } = useGetUsers(currentPage, 5, "organization");
  const deleteUser = useDeleteUserMutation();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  const columns = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Organization", key: "organization" },
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
        <Typography variant="h6">Users</Typography>
        <Button component={Link} to="/users/create" variant="contained">
          Create User
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
          {users?.data?.map((user) => (
            <EntityTableRow
              key={user.id}
              cells={[
                user.id,
                user.name,
                user.email,
                user.organizationId ?? "N/A",
              ]}
              actions={
                <TableActionButtons
                  editLink={`/users/${user.id}/edit`}
                  onDelete={() => deleteUser.mutate(user.id)}
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
        disableNext={currentPage === users?.pages}
        totalPages={users?.pages || 1}
      />
    </Box>
  );
}

export default Users;
