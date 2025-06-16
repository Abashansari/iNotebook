import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
} from '@toolpad/core/SignInPage';
import { createTheme } from '@mui/material/styles';
import { useColorSchemeShim } from 'docs/src/modules/components/ThemeContext';
import { getDesignTokens, inputsCustomizations } from './customTheme';

// Only email and password login
const providers = [
  { id: 'credentials', name: 'Email and Password' },
];

// Actual sign-in handler for credentials
const signIn = async (provider, credentials) => {
  if (provider.id === 'credentials') {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }

      const json = await response.json();
      console.log('Login response:', json);
      return {
        user: {
          id: json.user?.id || '123',
          name: json.user?.name || 'Email User',
        },
      };
    } catch (error) {
      console.error('Login failed:', error.message);
      throw new Error('Login failed: ' + error.message);
    }
  }
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
