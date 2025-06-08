import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';

import {
  SignInPage,
   AuthProvider,
   AuthResponse,
} from '@toolpad/core/SignInPage';
import { createTheme } from '@mui/material/styles';
import { useColorSchemeShim } from 'docs/src/modules/components/ThemeContext';
import { getDesignTokens, inputsCustomizations } from './customTheme';

// Available sign-in providers
const providers = [
  { id: 'github', name: 'GitHub' },
  { id: 'google', name: 'Google' },
  { id: 'credentials', name: 'Email and Password' },
];

// Mock sign-in function
const signIn = async (provider: AuthProvider): Promise<AuthResponse> => {
  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      console.log(`Signed in with ${provider.id}`);
      resolve({
        user: {
          id: '123',
          name: provider.name,
        },
      });
    }, 500);
  });
};

export default function ThemeSignInPage() {
  const { mode, systemMode } = useColorSchemeShim();
  const calculatedMode = mode === 'system' ? systemMode || 'light' : mode || 'light';

  const theme = createTheme({
    ...getDesignTokens(calculatedMode),
    palette: {
      mode: calculatedMode,
    },
    components: {
      ...inputsCustomizations,
    },
  });

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          form: { noValidate: true },
          submitButton: {
            color: 'primary',
            variant: 'contained',
          },
        }}
        sx={{
          '& form > .MuiStack-root': {
            mt: '2rem',
            rowGap: '0.5rem',
            maxWidth: 400,
            mx: 'auto',
            px: 2,
          },
        }}
      />
    </AppProvider>
  );
}
