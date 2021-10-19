import PropTypes from 'prop-types';
import { ReactComponent as IconPlus } from 'assets/icons/icon-plus.svg';
import Button from 'common/components/Button';

const Header = ({ onAddActivity }) => (
  <div className="content-header">
    <h1 className="content-header__title">Activity</h1>
    <Button color="primary" onClick={onAddActivity}>
      <IconPlus />
      <p>Tambah</p>
    </Button>
  </div>
);

Header.propTypes = { onAddActivity: PropTypes.func.isRequired };

export default Header;
