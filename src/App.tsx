import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthProvider from './providers/Auth';
import Main from './pages/Main';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <Container maxWidth="md">
        <Main />
      </Container>
    </AuthProvider>
  );
};

export default App;
