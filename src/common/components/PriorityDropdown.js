import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'bootstrap/js/dist/dropdown';

import { ReactComponent as CheckIcon } from 'assets/icons/icon-check.svg';
import { PRIORITY, PRIORITY_LABEL } from 'common/constants/activity';
import Indicator from './Indicator';

function PriorityDropdown({ value, onChange }) {
  const dropdownRef = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    dropdown.current = new Dropdown(dropdownRef.current);
  }, []); // eslint-disable-line

  return (
    <div className="dropdown priority-dropdown" ref={dropdownRef}>
      <button
        className="btn btn-secondary dropdown-toggle"
        id="dropdownMenuPriority"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="priority-active">
          <Indicator priority={value} />
          <p>{PRIORITY_LABEL[value]}</p>
        </div>
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuPriority">
        {Object.keys(PRIORITY).map(key => (
          <li key={key}>
            <button type="button" className="dropdown-item" onClick={() => onChange(PRIORITY[key])}>
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

PriorityDropdown.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
PriorityDropdown.defaultProps = {
  value: PRIORITY.VERYHIGH,
  onChange: () => {},
};

export default PriorityDropdown;
