import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  useEffect(() => {
    console.log('layout mounted');
  }, []);

  return (
    <main>
      <header>
        <div className="container">
          <h2>TO DO LIST APP</h2>
        </div>
      </header>
      {children}
    </main>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
Layout.defaultProps = {
  children: '',
};

export default Layout;
