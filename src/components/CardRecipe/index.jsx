
import './style.scss'
import EditIcon from '../../assets/icons/edit.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import { defaultImageRecipe } from '../../shared/detaultImageRecipe'
import { defaultColorRecipe } from '../../shared/defaultColorRecipe'
import Tag from '../Tag'

export default function CardRecipe({ editAction, deleteAction, detailsAction, category, name, instructions, imageUrl }) {
    const color = defaultColorRecipe
    const defaultImage = defaultImageRecipe

    return (
        <div className='CardRecipe'>
            <div className='CardRecipe-header'>
                <Tag label={category} />
                <div className='CardRecipe-header--actions'>
                    <img className='CardRecipe-icon' onClick={editAction} src={EditIcon} />
                    <img className='CardRecipe-icon' onClick={deleteAction} src={DeleteIcon} />
                </div>
            </div>
            <img className='CardRecipe-image' onClick={ detailsAction } src={imageUrl || defaultImage[category]} />
            <h3 className='CardRecipe-title'>{name}</h3>

            <a className='CardRecipe-link' onClick={ detailsAction }>Ver receita completa</a>
        </div>
    )
  }