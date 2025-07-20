import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, onShowAuth }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onShowAuth={onShowAuth} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

