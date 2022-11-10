import React, { ChangeEvent } from 'react';
import Select from 'react-select';

import { useAppDispatch } from '../../store/hooks';
import { updateQTZone } from '../../store/slices/questTrackerSlice';

import zones from '../../../data/zones.json';

const colourOptions = [
  { value: "blue", label: "Blue", color: "#0052CC" },
  { value: "yellow", label: "Yellow", color: "#FFC400" }
];

const flavourOptions = [
  { value: "vanilla", label: "Vanilla", rating: "safe" },
  { value: "chocolate", label: "Chocolate", rating: "good" }
];

const groupedOptions = [
  {
    label: "Colours",
    options: colourOptions
  },
  {
    label: "Flavours",
    options: flavourOptions
  }
];

const ZoneDropdowns = () => {
  const dispatch = useAppDispatch();

  const selectZone = (e: unknown) => { // FIND CORRECT TYPE
    // const zoneName = e.value;
    console.log('ZONE ', e);
    // dispatch(updateQTZone({ zone: zoneName }));
  }

  return (
    <div>
      <Select 
        options={groupedOptions}
        isSearchable
        placeholder='Select/search zone'
        onChange={(e) => selectZone(e)}
      />
    </div>
  );
}

export default ZoneDropdowns;