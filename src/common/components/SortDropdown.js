import React from 'react';
import { ReactComponent as SortNewestIcon } from '../../assets/icons/icon-sort-newest.svg';
import { ReactComponent as SortOldestIcon } from '../../assets/icons/icon-sort-oldest.svg';
import { ReactComponent as SortAscIcon } from '../../assets/icons/icon-sort-asc.svg';
import { ReactComponent as SortDescIcon } from '../../assets/icons/icon-sort-desc.svg';
import { ReactComponent as SortBlueIcon } from '../../assets/icons/icon-sort-blue.svg';
import { ReactComponent as SortIcon } from '../../assets/icons/icon-sort.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/icon-check.svg';
import { SORT } from '../constants/activity';
import './sort-dropdown.css';

function SortDropdown({ value, onChange }) {
  const menuRef = React.useRef(null);
  const sorts = [
    { key: 'NEWEST', label: SORT.NEWEST, icon: SortNewestIcon },
    { key: 'OLDEST', label: SORT.OLDEST, icon: SortOldestIcon },
    { key: 'ASC', label: SORT.ASC, icon: SortAscIcon },
    { key: 'DESC', label: SORT.DESC, icon: SortDescIcon },
    { key: 'NOTDONE', label: SORT.NOTDONE, icon: SortBlueIcon },
    { key: 'DONE', label: SORT.DONE, icon: SortBlueIcon },
  ];
  const toggleView = () => {
    menuRef.current.classList.toggle('show');
  };

  return (
    <div className="sort-dropdown">
      <button
        className="sort-dropdown__toggle"
        type="button"
        data-cy="todo-sort-button"
        onClick={toggleView}
      >
        <SortIcon />
      </button>
      <ul data-cy="sort-parent" className="sort-dropdown__menu" ref={menuRef}>
        {sorts.map((sort) => (
          <li key={sort.key} data-cy="sort-selection">
            <button
              type="button"
              className="sort-dropdown__item"
              onClick={() => {
                onChange(sort.label);
                toggleView();
              }}
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

export default SortDropdown;
