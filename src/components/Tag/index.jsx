
import './style.scss'
import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import { defaultImageRecipe } from '../../shared/detaultImageRecipe'
import { defaultColorRecipe } from '../../shared/defaultColorRecipe'

export default function Tag({ label }) {
    const color = defaultColorRecipe

    return (
        <div className={'Tag '+ color[label]}>
            {label}
        </div>
    )
  }