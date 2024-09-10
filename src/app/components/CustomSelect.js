import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.css'; // Ensure this path is correct

const CustomSelect = ({ options, onSelect, id }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
    onSelect(option.id); // Pass ID to parent
  };

  return (
    <div className={styles.customSelectWrapper}>
      <div 
        style={{ 
          backgroundColor: "#fff", 
          padding: "2%", 
          display: 'flex',         // Use Flexbox
          alignItems: 'center',    // Align items vertically
          justifyContent: 'space-between' // Push icon to the right
        }}
        className={styles.customSelect}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <i className={selectedOption.iconClass}></i>
          <span style={{ marginLeft: '10px' }}>
            {selectedOption.text}
          </span>
        </div>
        {/* Add a down arrow icon */}
        <i className="fas fa-chevron-down"></i> 
      </div>
      {isOpen && (
        <div className={styles.customOptions}>
          {options.map((option) => (
            <div 
              style={{ backgroundColor: "#fff", padding: "2%" }}
              key={option.id} // Use id as the key
              className={styles.customOption}
              onClick={() => handleOptionClick(option)}
            >
              <i className={option.iconClass}></i> {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    iconClass: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  onSelect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default CustomSelect;
