import './style.scss';
import { defaultColorRecipe } from '../../shared/defaultColorRecipe';
import TodosIcon from '../../assets/icons/todos.svg';
import PrincipalIcon from '../../assets/icons/principal.svg';
import SaudavelIcon from '../../assets/icons/saudavel.svg';
import Lanchecon from '../../assets/icons/lanche.svg';
import DoceIcon from '../../assets/icons/doce.svg';
import BebidaIcon from '../../assets/icons/bebida.svg';

export default function CardCategory({ label, click }) {
  const color = defaultColorRecipe;
  const image = {
    Todos: TodosIcon,
    Doce: DoceIcon,
    Principal: PrincipalIcon,
    Saudável: SaudavelIcon,
    Lanche: Lanchecon,
    Bebida: BebidaIcon,
  };

  return (
    <div className={'CardCategory ' + color[label]} onClick={click}>
      <span className="CardCategory-text">{label}</span>
      <img className="CardCategory-image" src={image[label]} />
    </div>
  );
}
