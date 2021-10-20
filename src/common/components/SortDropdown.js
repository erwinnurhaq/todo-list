import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'bootstrap/js/dist/dropdown';

import { ReactComponent as NewestIcon } from 'assets/icons/icon-sort-newest.svg';
import { ReactComponent as OldestIcon } from 'assets/icons/icon-sort-oldest.svg';
import { ReactComponent as AscIcon } from 'assets/icons/icon-sort-asc.svg';
import { ReactComponent as DescIcon } from 'assets/icons/icon-sort-desc.svg';
import { ReactComponent as NotDoneIcon } from 'assets/icons/icon-sort-blue.svg';
import { ReactComponent as SortIcon } from 'assets/icons/icon-sort.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check.svg';
import { SORT } from 'common/constants/activity';

function SortDropdown({ value, onChange }) {
  const dropdownRef = useRef(null);
  const dropdown = useRef(null);

  const RenderIcon = type => {
    switch (type) {
      case 'NEWEST':
        return <NewestIcon />;
      case 'OLDEST':
        return <OldestIcon />;
      case 'ASC':
        return <AscIcon />;
      case 'DESC':
        return <DescIcon />;
      case 'NOTDONE':
        return <NotDoneIcon />;
      default:
        return <NotDoneIcon />;
    }
  };

  useEffect(() => {
    dropdown.current = new Dropdown(dropdownRef.current);
  }, []); // eslint-disable-line

  return (
    <div className="dropdown sort-dropdown" ref={dropdownRef}>
      <button
        className="btn btn-secondary dropdown-toggle"
        id="dropdownMenuSort"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-cy="todo-sort-button"
      >
        <SortIcon />
      </button>
      <ul data-cy="sort-parent" className="dropdown-menu" aria-labelledby="dropdownMenuSort">
        {Object.keys(SORT).map(key => (
          <li key={key} data-cy="sort-selection">
            <button
              type="button"
              className="dropdown-item"
              onClick={() => onChange(SORT[key])}
              data-cy={SORT[key] === value && 'sort-selection-selected'}
            >
              <div data-cy="sort-selection-icon">{RenderIcon(key)}</div>
              <p data-cy="sort-selection-title">{SORT[key]}</p>
              {SORT[key] === value && <CheckIcon />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

SortDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
SortDropdown.defaultProps = {
  value: SORT.NEWEST,
  onChange: () => {},
};

export default SortDropdown;
