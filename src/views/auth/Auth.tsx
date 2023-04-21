import React, { useCallback, useState } from 'react';

import { Google, LinkedIn, Window } from '@mui/icons-material';
import { Alert, Box, Button, Divider, Typography } from '@mui/material';

import ForgotPwdForm from '../../components/auth/ForgotPwdForm';
import SigninForm from '../../components/auth/SigninForm';
import SignupForm from '../../components/auth/SignupForm';
import { useFirebase } from '../../firebase';

const Auth = () => {
  const { signInWithGoogle, signInWithMicrosoft } = useFirebase();
  const [authMode, setAuthMode] = useState('signin');

  const handleClickSignup = useCallback(() => {
    setAuthMode('signup');
  }, []);
  const handleClickSignin = useCallback(() => {
    setAuthMode('signin');
  }, []);
  const handleClickForgotPwd = useCallback(() => {
    setAuthMode('forgotpwd');
  }, []);

  return (
    <Box
      className="mainBkg"
      style={{
        backgroundImage: `url(${require('../../assets/images/background.ed92fc21.jpg')})`
      }}
    >
      <Box className="contentWrap">
        <Box className="leftWrap">
          <Box className="imgCont">
            <img src={require('../../assets/images/spiral.53b194f3.svg').default} alt="spiral" />
          </Box>
          <Box className="textHld">
            <Box className="majorCap">WELCOME TO THE MARKETPLACE</Box>
            <Box className="minorText">
              Exceptionly provides hands-on tested remote software engineers unlike any other
              outsourcing company. Our product delivers talent directly for hiring without a
              lifetime markup over 400%.
            </Box>
          </Box>
        </Box>

        <Box className="rightWrap">
          <Box className="topHld">
            <Box className="actionTitle">
              <img
                src={require('../../assets/images/logo.bf7070eb.svg').default}
                alt="exceptionly logo"
              />
              <Box className="proText">
                <Typography>
                  {authMode === 'signin'
                    ? 'Sign in to your account'
                    : authMode === 'signup'
                    ? 'Sign up to your account'
                    : 'Password Recovery'}
                </Typography>
              </Box>
            </Box>

            <Box className="vertical-centre">
              {authMode === 'forgotpwd' ? (
                <>
                  <Alert
                    severity="info"
                    icon={false}
                    sx={{
                      mt: 8,
                      mb: 8
                    }}
                  >
                    <Typography variant="body1" gutterBottom>
                      What's Next?
                    </Typography>
                    We are going to send a recovery email to your address if there is an associated
                    account. You can use the link for resetting your password.
                  </Alert>
                  <ForgotPwdForm />
                </>
              ) : (
                <>
                  <Box className="signInGroup">
                    <Button
                      onClick={signInWithGoogle}
                      variant="contained"
                      color="primary"
                      startIcon={<Google />}
                      sx={{
                        width: '100%',
                        mb: 2
                      }}
                    >
                      SIGN IN WITH GOOGLE
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<LinkedIn />}
                      sx={{
                        width: '100%',
                        mb: 2
                      }}
                    >
                      SIGN IN WITH LINKEDIN
                    </Button>
                    <Button
                      onClick={signInWithMicrosoft}
                      variant="contained"
                      color="warning"
                      startIcon={<Window />}
                      sx={{
                        width: '100%',
                        mb: 2
                      }}
                    >
                      SIGN IN WITH MICROSOFT
                    </Button>
                    <Divider sx={{ color: 'rgb(102, 102, 102)' }}>or use business email</Divider>
                  </Box>

                  <Box>
                    {authMode === 'signin' ? (
                      <SigninForm onForgotPwd={handleClickForgotPwd} />
                    ) : (
                      <SignupForm />
                    )}
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Box>
            <Box className="btHld">
              <Box className="innerNewText">
                <Typography component="span">
                  {authMode === 'signin' ? `Don't have an account?` : `Already have an account?`}
                </Typography>
                {authMode === 'signin' ? (
                  <Box onClick={handleClickSignup}>
                    <Typography component="span">CREATE ACCOUNT</Typography>
                  </Box>
                ) : (
                  <Box onClick={handleClickSignin}>
                    <Typography component="span">SIGN IN HERE</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;
