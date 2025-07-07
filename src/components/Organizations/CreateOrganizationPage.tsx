import { useNavigate } from "react-router-dom";
import { useCreateOrganization } from "../../utils/useOrganizationMutations";
import OrganizationForm, {
  type OrganizationFormInputs,
} from "./OrganizationForm";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner.tsx";
import { useGetProjects } from "../../utils/useProjectMutations.ts";

function CreateOrganizationPage() {
  const navigate = useNavigate();
  const createOrg = useCreateOrganization();
  const { data: projects, isLoading } = useGetProjects();
  if (isLoading) return <LoadingSpinner />;

  const handleSubmit = async (data: OrganizationFormInputs) => {
    await createOrg.mutateAsync(data);
    navigate("/organizations");
  };

  return (
    <OrganizationForm
      title="Create Organization"
      onSubmit={handleSubmit}
      onCancel={() => navigate("/organizations")}
      projects={projects?.data || []}
    />
  );
}

export default CreateOrganizationPage;
