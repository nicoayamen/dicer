import React, { useState } from 'react';
import Button from '@mui/material/Button';
import '../styles/matchFilter.css';
import { FormControl, InputLabel, MenuItem, Select, RadioGroup, FormControlLabel, Radio } from '@mui/material';


const MatchFilter = ({ handleFilterChange }) => {
  const userId = Number(window.localStorage.getItem('userid'));
  const [formData, setFormData] = useState({ classType: '', isDM: false });
  const [toggle, setToggle] = useState(false);
  const [buttonName, setButtonName] = useState('Show filters');

  //Show or hide filters
  const handleToggle = () => {
    !toggle ? setToggle(true) : setToggle(false);
    buttonName === 'Show filters' ? setButtonName('Hide filters') : setButtonName('Show filters');
  };

  //Handle dropdown and radio button input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? value === 'true' : value
    });
  };

  //Submit request for filtered users
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilterChange(formData);
  };


  return (
    <div>
      <Button onClick={handleToggle} className='matchfilter-button' sx={{ m: 1, minWidth: 150 }}>{buttonName}</Button>

      {toggle && 

      <form onSubmit={handleSubmit} className='matchfilter-form'>
        <div className='matchfilter-content'>

          <div className='matchfilter-box'>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 300 }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                color="secondary"
              >
                Preferred Class:
              </InputLabel>
              <Select
                name='classType'
                value={formData.classType}
                onChange={handleChange}
                color="secondary"
              >
                <MenuItem value="">Select a class type</MenuItem>
                <MenuItem value="Barbarian">Barbarian</MenuItem>
                <MenuItem value="Bard">Bard</MenuItem>
                <MenuItem value="Cleric">Cleric</MenuItem>
                <MenuItem value="Druid">Druid</MenuItem>
                <MenuItem value="Fighter">Fighter</MenuItem>
                <MenuItem value="Monk">Monk</MenuItem>
                <MenuItem value="Multiclass">Multiclass</MenuItem>
                <MenuItem value="Paladin">Paladin</MenuItem>
                <MenuItem value="Ranger">Ranger</MenuItem>
                <MenuItem value="Rogue">Rogue</MenuItem>
                <MenuItem value="Sorcerer">Sorcerer</MenuItem>
                <MenuItem value="Warlock">Warlock</MenuItem>
                <MenuItem value="Wizard">Wizard</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='matchfilter-box-input'>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  name='isDM'
                  value='true'
                  checked={formData.isDM === true}
                  onChange={handleChange}
                  control={<Radio color="secondary" />}
                  label="DM"
                />
                <FormControlLabel
                  name='isDM'
                  value='false'
                  checked={formData.isDM === false}
                  onChange={handleChange}
                  control={<Radio color="secondary" />}
                  label="Player"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <button type='submit' className=''>Save</button>
          <button className='' onClick={() => setFormData({ classType: '', isDM: false })}>Clear</button>

        </div>
      </form >
}

    </div >
  );
};

export default MatchFilter;