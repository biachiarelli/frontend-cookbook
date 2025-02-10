import './style.scss';
import { defaultColorRecipe } from '../../shared/defaultColorRecipe';

export default function Tag({ label }) {
  const color = defaultColorRecipe;

  return <div className={'Tag ' + color[label]}>{label}</div>;
}
