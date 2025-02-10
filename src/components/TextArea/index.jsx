import './style.scss';

export default function TextArea({
  label,
  name,
  rows,
  placeholder,
  ref,
  variant,
  message,
  onBlur,
  onChange,
}) {
  return (
    <div className={'TextArea ' + variant}>
      <label htmlFor={name} className="TextArea-label">
        {label}{' '}
      </label>
      <textarea
        className="TextArea-field"
        name={name}
        placeholder={placeholder}
        rows={rows}
        ref={ref}
        onBlur={onBlur}
        onChange={onChange}
      />
      {message && <span className="TextArea-message">{message}</span>}
    </div>
  );
}
