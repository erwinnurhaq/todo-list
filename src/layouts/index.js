import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <main>
    <header>
      <div className="container" data-cy="header-background">
        <h2 data-cy="header-title">TO DO LIST APP</h2>
      </div>
    </header>
    {children}
  </main>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
Layout.defaultProps = {
  children: '',
};

export default Layout;
