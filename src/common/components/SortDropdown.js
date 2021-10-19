import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'bootstrap/js/dist/dropdown';

import { ReactComponent as CheckIcon } from 'assets/icons/icon-check.svg';
import { SORT } from 'common/constants/activity';

function SortDropdown({ value, onChange }) {
  const dropdownRef = useRef(null);
  const dropdown = useRef(null);

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
      >
        icon
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuSort">
        {Object.keys(SORT).map(key => (
          <li key={key}>
            <button type="button" className="dropdown-item" onClick={() => onChange(SORT[key])}>
              <p>{SORT[key]}</p>
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
