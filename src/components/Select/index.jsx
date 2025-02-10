import './style.scss';

export default function Select({
  label,
  name,
  type = 'text',
  ref,
  options,
  variant,
  message,
  onBlur,
  onChange,
}) {
  return (
    <div className={'Select ' + variant}>
      <label htmlFor={name} className="Select-label">
        {label}{' '}
      </label>
      <select
        required
        name={name}
        type={type}
        className="Select-field"
        ref={ref}
        defaultValue={'default'}
        onBlur={onBlur}
        onChange={onChange}
      >
        <option value="default" disabled></option>
        {options.map((option) => (
          <option key={option.id} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
      {message && <span className="Select-message">{message}</span>}
    </div>
  );
}
