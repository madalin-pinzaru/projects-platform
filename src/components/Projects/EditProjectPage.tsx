import { useParams, useNavigate } from "react-router-dom";
import ProjectForm, { type ProjectFormInputs } from "./ProjectForm.tsx";
import {
  useGetProjects,
  useUpdateProject,
} from "../../utils/useProjectMutations";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner.tsx";
import ErrorPage from "../common/ErrorPage/ErrorPage.tsx";

function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // The api doesn't support fetching a single project by ID, so we fetch all projects and find by id
  const { data: projects, isLoading } = useGetProjects();
  const updateProject = useUpdateProject();

  if (isLoading) return <LoadingSpinner />;
  const project = projects?.data.find((p) => p.id === id);
  if (!project) return <ErrorPage />;

  const handleEdit = (data: ProjectFormInputs) => {
    updateProject.mutate(
      { id: id!, data },
      { onSuccess: () => navigate("/projects") },
    );
  };

  return (
    <ProjectForm
      title="Edit Project"
      defaultValues={project}
      onSubmit={handleEdit}
      onCancel={() => navigate("/projects")}
    />
  );
}

export default EditProjectPage;
