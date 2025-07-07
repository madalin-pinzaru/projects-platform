import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export type OrganizationFormInputs = {
  name: string;
  acronym: string;
  country: string;
  project: string;
};

type Project = { id: string; name: string };

type Props = {
  defaultValues?: OrganizationFormInputs;
  onSubmit: (data: OrganizationFormInputs) => void;
  onCancel: () => void;
  title: string;
  projects: Project[];
};

function OrganizationForm({
  defaultValues,
  onSubmit,
  title,
  onCancel,
  projects,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationFormInputs>({ defaultValues });

  return (
    <Paper sx={{ maxWidth: 600, margin: "2rem auto", padding: "2rem" }}>
      <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
        {title}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Acronym"
          {...register("acronym", { required: "Acronym is required" })}
          error={!!errors.acronym}
          helperText={errors.acronym?.message}
        />
        <TextField
          label="Country"
          {...register("country", { required: "Country is required" })}
          error={!!errors.country}
          helperText={errors.country?.message}
        />
        <FormControl>
          <InputLabel id="project-label">Project</InputLabel>
          <Select
            labelId="project-label"
            label="Project"
            defaultValue={defaultValues?.project || ""}
            {...register("project", { required: "Project is required" })}
            error={!!errors.project}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          {onCancel && (
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default OrganizationForm;
