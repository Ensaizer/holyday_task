import React from 'react';
import NavBar from './ui/NavBar';

export default function App({ children, user }) {
  return (
    <>
      <NavBar user={user} />
      <div>{children}</div>;
    </>
  );
}
