import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';

export default function FormInput({ control, name, register, ...rest }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          error={Boolean(error?.message)}
          helperText={error?.message}
          value={field.value ?? ''}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{
            mt: 2,
            mb: 1,
            height: '50px'
          }}
          {...register(name)}
          data-testid={`account-${name}`}
        />
      )}
    />
  );
}
