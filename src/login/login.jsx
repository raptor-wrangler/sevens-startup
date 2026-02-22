import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Unauthenticated } from './unauthenticated';
import { AuthState } from './authState';


export function Login({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();

  return (
    <main>
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
              navigate('/search');
            }}
          />
        )}
    </main>
  );
}