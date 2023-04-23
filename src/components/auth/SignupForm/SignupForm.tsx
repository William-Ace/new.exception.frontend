import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import * as yup from 'yup';

import FormInput from '../../Input/FormInput';

const formSchema = yup.object().shape({
  firstname: yup.string().required('This field is required'),
  lastname: yup.string().required('This field is required'),
  email: yup.string().email().required('This field is required'),
  password: yup.string().required('No password provided')
});

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: ''
};

const SignupForm = () => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: initialValues
  });

  const onFormSubmit = useCallback(() => {
    console.log('Sign up');
  }, []);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="signInForm">
      <FormInput
        control={control}
        name="firstname"
        label="First name"
        type="text"
        variant="standard"
      />
      <FormInput
        control={control}
        name="lastname"
        label="Last name"
        type="text"
        variant="standard"
      />
      <FormInput control={control} name="email" label="Email" type="text" variant="standard" />
      <FormInput
        control={control}
        name="password"
        label="Password"
        type="password"
        variant="standard"
      />
      <Box className="signInForm__buttons">
        <Button color="primary" type="submit" variant="contained">
          SIGN UP
        </Button>
      </Box>
    </form>
  );
};

export default SignupForm;
