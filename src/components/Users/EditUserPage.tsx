import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../utils/usersApi";
import { getOrganizations } from "../../utils/organizationsApi";
import { useUpdateUserMutation } from "../../utils/useUsersMutations";
import UserForm, { type UserFormInputs } from "./UserForm";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import ErrorPage from "../common/ErrorPage/ErrorPage";
import type { User } from "../../utils/types.ts";

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: users,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["users", 1, undefined],
    queryFn: () => getUsers(1),
    enabled: !!id,
  });

  const {
    data: orgs,
    isLoading: orgsLoading,
    isError: orgsError,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations(1),
  });

  const updateUser = useUpdateUserMutation();

  if (userLoading || orgsLoading) return <LoadingSpinner />;
  if (userError || orgsError || !users) return <ErrorPage />;

  const user = users.data.find((u: User) => u.id === id);
  if (!user) return <ErrorPage />;

  const defaultValues: UserFormInputs = {
    name: user.name,
    email: user.email,
    organizationId: user.organizationId,
  };

  return (
    <UserForm
      title="Edit User"
      submitLabel="Update User"
      defaultValues={defaultValues}
      organizations={orgs?.data || []}
      onSubmit={(values) => {
        updateUser.mutate(
          { id: id!, data: values },
          {
            onSuccess: () => navigate("/users"),
          },
        );
      }}
    />
  );
}
