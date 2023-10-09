import React from 'react';
import { FilterWrap } from './Filter.styled';

export default function Filter({ handleFilterChange }) {
  return (
    <FilterWrap>
      Find contact by name
      <input
        type="text"
        name="filter"
        onChange={evt => handleFilterChange(evt.target.value)}
      />
    </FilterWrap>
  );
}
