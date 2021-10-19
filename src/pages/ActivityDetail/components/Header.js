import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ReactComponent as PlusIcon } from 'assets/icons/icon-plus.svg';
import { ReactComponent as BackIcon } from 'assets/icons/icon-back.svg';
import { ReactComponent as EditIcon } from 'assets/icons/icon-edit-h.svg';
import Button from 'common/components/Button';

function Header({ isLoading, title, onAddTask, onEditTitle }) {
  const history = useHistory();
  const [isEditTitle, setIsEditTitle] = useState(false);
  const titleInput = useRef(null);

  const toggleTitleEdit = () => {
    setIsEditTitle(!isEditTitle);
  };
  const handleSaveTitle = ev => {
    onEditTitle(ev.target.value);
    toggleTitleEdit();
  };

  useEffect(() => {
    if (isEditTitle) {
      titleInput.current.focus();
    }
  }, [isEditTitle]);

  return (
    <div className="content-header">
      <div className="content-header-wrapper">
        <button
          type="button"
          className="content-header__back-icon"
          onClick={() => history.push('/')}
          disabled={isLoading}
        >
          <BackIcon />
        </button>
        {isEditTitle ? (
          <input
            type="text"
            ref={titleInput}
            defaultValue={title}
            onBlur={handleSaveTitle}
            onKeyDown={ev => (ev.key === 'Enter' ? handleSaveTitle(ev) : null)}
          />
        ) : (
          <h1 className="content-header__title" onClick={toggleTitleEdit}>
            {title}
          </h1>
        )}
        <button
          type="button"
          className="content-header__edit-icon"
          onClick={toggleTitleEdit}
          disabled={isLoading || isEditTitle}
        >
          <EditIcon />
        </button>
      </div>
      <div className="content-header-wrapper">
        <Button color="primary" onClick={onAddTask} disabled={isLoading}>
          <PlusIcon />
          <p>Tambah</p>
        </Button>
      </div>
    </div>
  );
}

Header.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
};

export default Header;
