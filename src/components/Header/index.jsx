
import Button from '../Button'
import './style.scss'

export default function Header({ props }) {

    return (
        <div className='Header'>
            <img className='Header-img' src={props.img} />
            <div className='Header-content'>
                {  props.title &&  
                    <h1 className='Header-title'>{ props.title }</h1>
                }
                {  props.subtitle &&  
                    <h2 className='Header-subtitle'>{ props.subtitle }</h2>
                }
                {  props.button && props.button.label && 
                    <div className='Header-button'>
                        <Button label={props.button.label} action={props.button.action} />
                    </div>
                }
            </div>
        </div>
    )
  }