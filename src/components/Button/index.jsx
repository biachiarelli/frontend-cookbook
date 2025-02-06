
import './style.scss'
import { defaultColorRecipe } from '../../shared/defaultColorRecipe'

export default function Button({ label, action }) {
    return (
        <button type='button' onClick={action} className='Button'>
            { label }
        </button>
    )
  }