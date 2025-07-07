import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";

export type Organization = {
  id: string;
  name: string;
};

export type UserFormInputs = {
  name: string;
  email: string;
  organizationId: string;
};

type Props = {
  defaultValues?: UserFormInputs;
  onSubmit: (data: UserFormInputs) => void;
  title: string;
  submitLabel: string;
  organizations: Organization[];
};

function UserForm({
  defaultValues,
  onSubmit,
  title,
  submitLabel,
  organizations,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({ defaultValues });

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
          label="Email"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          select
          label="Organization"
          {...register("organizationId", {
            required: "Organization is required",
          })}
          error={!!errors.organizationId}
          helperText={errors.organizationId?.message}
        >
          {organizations.map((org) => (
            <MenuItem key={org.id} value={org.id}>
              {org.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          {submitLabel}
        </Button>
      </Box>
    </Paper>
  );
}

export default UserForm;
