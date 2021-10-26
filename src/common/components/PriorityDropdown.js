import React from 'react';
import { ReactComponent as CheckIcon } from '../../assets/icons/icon-check.svg';
import { PRIORITY, PRIORITY_LABEL } from '../constants/activity';
import Indicator from './Indicator';
import './priority-dropdown.css';

function PriorityDropdown({ value, onChange }) {
  const menuRef = React.useRef(null);
  const toggleView = () => {
    menuRef.current.classList.toggle('show');
  };

  return (
    <div className="priority-dropdown">
      <button
        className="priority-dropdown__toggle"
        data-cy="modal-add-priority-dropdown"
        type="button"
        onClick={toggleView}
      >
        <div className="priority-active">
          <Indicator priority={value} />
          <p>{PRIORITY_LABEL[value]}</p>
        </div>
      </button>
      <ul className="priority-dropdown__menu" ref={menuRef}>
        {Object.keys(PRIORITY).map((key) => (
          <li key={key}>
            <button
              type="button"
              data-cy="modal-add-priority-item"
              className="priority-dropdown__item"
              onClick={() => {
                onChange(PRIORITY[key]);
                toggleView();
              }}
            >
              <Indicator priority={PRIORITY[key]} />
              <p>{PRIORITY_LABEL[PRIORITY[key]]}</p>
              {PRIORITY[key] === value && <CheckIcon />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PriorityDropdown;
