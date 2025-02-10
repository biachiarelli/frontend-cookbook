
import './style.scss'

export default function Input({ label, name, type='text', ref, variant, message, onBlur, onChange }) {

    return (
        <div className={'Input '+ variant}>
            <label htmlFor={ name } className='Input-label'>{ label } </label>
            <input name={ name } type={type} className='Input-field' ref={ref} onBlur={onBlur} onChange={onChange}/>
            { message && <span className='Input-message'>{message}</span> }
        </div>
    )
  }