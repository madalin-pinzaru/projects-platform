import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOrganizations,
  useUpdateOrganization,
} from "../../utils/useOrganizationMutations";
import OrganizationForm, {
  type OrganizationFormInputs,
} from "./OrganizationForm.tsx";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner.tsx";
import ErrorPage from "../common/ErrorPage/ErrorPage.tsx";
import { useGetProjects } from "../../utils/useProjectMutations.ts";

function EditOrganizationPage() {
  const { id } = useParams<{ id: string }>();
  const { data: organizations, isLoading } = useGetOrganizations();
  const { data: projects, isLoading: isProjectsLoading } = useGetProjects();
  const updateOrg = useUpdateOrganization();
  const navigate = useNavigate();

  if (isLoading || isProjectsLoading) return <LoadingSpinner />;
  const org = organizations?.data.find((o) => o.id === id);
  if (!org) return <ErrorPage />;

  const handleSubmit = async (data: OrganizationFormInputs) => {
    await updateOrg.mutateAsync({ id: org.id, data });
    navigate("/organizations");
  };

  return (
    <OrganizationForm
      title="Edit Organization"
      defaultValues={{
        name: org.name,
        acronym: org.acronym,
        country: org.country,
        project: org.project ?? "",
      }}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/organizations")}
      projects={projects?.data || []}
    />
  );
}

export default EditOrganizationPage;
