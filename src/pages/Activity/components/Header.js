import React from 'react';
import { ReactComponent as IconPlus } from '../../../assets/icons/icon-plus.svg';
import Button from '../../../common/components/Button';

const Header = ({ onAddActivity, isLoading }) => (
  <div className="content-header">
    <h1 className="content-header__title" data-cy="activity-title">
      Activity
    </h1>
    <Button
      color="primary"
      onClick={onAddActivity}
      disabled={isLoading}
      data-cy="activity-add-button"
    >
      <IconPlus />
      <p>Tambah</p>
    </Button>
  </div>
);

export default Header;
