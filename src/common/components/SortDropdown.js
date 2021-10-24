import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'bootstrap/js/dist/dropdown';

import { ReactComponent as SortNewestIcon } from 'assets/icons/icon-sort-newest.svg';
import { ReactComponent as SortOldestIcon } from 'assets/icons/icon-sort-oldest.svg';
import { ReactComponent as SortAscIcon } from 'assets/icons/icon-sort-asc.svg';
import { ReactComponent as SortDescIcon } from 'assets/icons/icon-sort-desc.svg';
import { ReactComponent as SortBlueIcon } from 'assets/icons/icon-sort-blue.svg';
import { ReactComponent as SortIcon } from 'assets/icons/icon-sort.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/icon-check.svg';
import { SORT } from 'common/constants/activity';

function SortDropdown({ value, onChange }) {
  const dropdownRef = useRef(null);
  const dropdown = useRef(null);

  const sorts = [
    { key: 'NEWEST', label: SORT.NEWEST, icon: SortNewestIcon },
    { key: 'OLDEST', label: SORT.OLDEST, icon: SortOldestIcon },
    { key: 'ASC', label: SORT.ASC, icon: SortAscIcon },
    { key: 'DESC', label: SORT.DESC, icon: SortDescIcon },
    { key: 'NOTDONE', label: SORT.NOTDONE, icon: SortBlueIcon },
    { key: 'DONE', label: SORT.DONE, icon: SortBlueIcon },
  ];

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
        {sorts.map(sort => (
          <li key={sort.key} data-cy="sort-selection">
            <button
              type="button"
              className="dropdown-item"
              onClick={() => onChange(sort.label)}
              data-cy={sort.label === value && 'sort-selection-selected'}
            >
              <div data-cy="sort-selection-icon">
                <sort.icon />
              </div>
              <p data-cy="sort-selection-title">{sort.label}</p>
              {sort.label === value && <CheckIcon />}
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
