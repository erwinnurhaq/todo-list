import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ReactComponent as PlusIcon } from 'assets/icons/icon-plus.svg';
import { ReactComponent as BackIcon } from 'assets/icons/icon-back.svg';
import { ReactComponent as EditIcon } from 'assets/icons/icon-edit-1.svg';
import Button from 'common/components/Button';
import SortDropdown from 'common/components/SortDropdown';

function Header({ title, sort, setSort, onAddTask, onEditTitle }) {
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
          data-cy="todo-back-button"
        >
          <BackIcon />
        </button>
        {isEditTitle ? (
          <input
            type="text"
            className="content-header__title-input"
            ref={titleInput}
            defaultValue={title}
            onBlur={handleSaveTitle}
            onKeyDown={ev => (ev.key === 'Enter' ? handleSaveTitle(ev) : null)}
          />
        ) : (
          <h1 data-cy="todo-title" className="content-header__title" onClick={toggleTitleEdit}>
            {title}
          </h1>
        )}
        <button
          type="button"
          className="content-header__edit-icon"
          data-cy="todo-title-edit-button"
          onClick={toggleTitleEdit}
          disabled={isEditTitle}
        >
          <EditIcon />
        </button>
      </div>
      <div className="content-header-wrapper">
        <SortDropdown value={sort} onChange={setSort} />
        <Button color="primary" onClick={onAddTask} data-cy="todo-add-button">
          <PlusIcon />
          <p>Tambah</p>
        </Button>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func.isRequired,
};
Header.defaultProps = {
  title: 'Activity',
};

export default Header;
