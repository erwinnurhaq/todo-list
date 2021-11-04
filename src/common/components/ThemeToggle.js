import React from 'react';
import './theme-toggle.css';

const ThemeToggle = ({ checked, onChange }) => (
  <div className="theme-toggle">
    <input
      className="theme-toggle-input"
      type="checkbox"
      id="theme-switch"
      checked={checked}
      onChange={onChange}
    />
    <label className="theme-toggle-label" htmlFor="theme-switch">
      Toggle
    </label>
  </div>
);

export default ThemeToggle;
