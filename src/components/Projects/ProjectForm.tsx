import { useForm } from "react-hook-form";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

export type ProjectFormInputs = {
  name: string;
  acronym: string;
  description: string;
};

type Props = {
  defaultValues?: ProjectFormInputs;
  onSubmit: (data: ProjectFormInputs) => void;
  title: string;
  onCancel?: () => void;
};

function ProjectForm({ defaultValues, onSubmit, title, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormInputs>({ defaultValues });

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
          label="Description"
          multiline
          rows={4}
          {...register("description", { required: "Description is required" })}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Paper>
  );
}

export default ProjectForm;
