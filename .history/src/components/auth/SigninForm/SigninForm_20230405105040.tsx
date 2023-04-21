import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import * as yup from 'yup';

import FormInput from '../../Input/FormInput';

const formSchema = yup.object().shape({
  email: yup.string().email().required('This field is required'),
  password: yup.string().required('No password provided')
});

const initialValues = {
  email: '',
  password: ''
};

interface SigninFormProps {
  onForgotPwd: () => void;
}

const SigninForm: React.FC<SigninFormProps> = ({ onForgotPwd }) => {
  const { handleSubmit, control, register, getValues } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: initialValues
  });

  const onFormSubmit = useCallback(() => {
    const { email, password } = getValues();
  }, []);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="signInForm">
      <FormInput
        control={control}
        label="Email"
        type="text"
        variant="standard"
        {...register('email')}
      />
      <FormInput
        control={control}
        label="Password"
        type="password"
        variant="standard"
        {...register('password')}
      />
      <Box className="signInForm__buttons">
        <Button color="primary" type="submit" variant="contained">
          SIGN IN
        </Button>
        <Box className="passRecoveryForm__forgotPassword" onClick={onForgotPwd}>
          Forgot password?
        </Box>
      </Box>
    </form>
  );
};

export default SigninForm;
