import { useNavigate } from "react-router-dom";
import ProjectForm, { type ProjectFormInputs } from "./ProjectForm.tsx";
import { useCreateProject } from "../../utils/useProjectMutations";

function CreateProjectPage() {
  const navigate = useNavigate();
  const createProject = useCreateProject();

  const handleCreate = (data: ProjectFormInputs) => {
    createProject.mutate(data, {
      onSuccess: () => navigate("/projects"),
    });
  };

  return (
    <ProjectForm
      title="Create Project"
      onSubmit={handleCreate}
      onCancel={() => navigate("/projects")}
    />
  );
}

export default CreateProjectPage;
