import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "../../utils/organizationsApi";
import { useCreateUserMutation } from "../../utils/useUsersMutations";
import UserForm from "./UserForm";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../common/ErrorPage/ErrorPage";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const {
    data: orgs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations(1, 100),
  });
  const createUser = useCreateUserMutation();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorPage />;

  return (
    <UserForm
      title={"Create User"}
      organizations={orgs?.data || []}
      onSubmit={(values) => {
        createUser.mutate(values, {
          onSuccess: () => navigate("/users"),
        });
      }}
      submitLabel="Create User"
    />
  );
}
