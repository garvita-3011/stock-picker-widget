import './style.css';

const Select = ({ record, onChange }) => (
    <select onChange={onChange} className="dropdown">
      {record.map((interval, index) => (
        <option
          value={interval.key}
          selected={index === 0}
          key={interval.key}
          className="dropdown-item"
        >
          {interval.value}
        </option>
      ))}
    </select>
);

export default Select;
