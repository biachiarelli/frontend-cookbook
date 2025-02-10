import './style.scss';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultImageRecipe } from '../../shared/detaultImageRecipe';
import EditIcon from '../../assets/icons/edit.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import element from '../../assets/image/element-background.png';
import Tag from '../../components/Tag';
import Button from '../../components/Button';

export default function DetailsRecipe() {
  let { id } = useParams();
  const [recipe, setRecipe] = useState('');
  const navigate = useNavigate();
  const defaultImage = defaultImageRecipe;

  async function getRecipe() {
    try {
      const res = await api.get('/recipes?id=' + id);
      setRecipe(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  function goToHomePage() {
    navigate('/');
  }

  async function deleteRecipe(id) {
    await api.delete('/recipes/' + id);

    goToHomePage();
  }

  function editRecipe(id) {
    navigate('/adicionar-receita/' + id);
  }

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div className="DetailsRecipe">
      <img className="DetailsRecipe-background" src={element} />
      <div className="DetailsRecipe-header">
        <h2 onClick={goToHomePage} className="DetailsRecipe-header--title">
          Livro de receitas
        </h2>
        <Button label={'Ver todas as receias'} action={goToHomePage} />
      </div>
      <div className="DetailsRecipe-content">
        <div>
          <div className="DetailsRecipe-content--actions">
            <Tag label={recipe.category} />
            <div className="DetailsRecipe-content--icons">
              <img
                className="icon"
                onClick={() => editRecipe(recipe.id)}
                src={EditIcon}
              />
              <img
                className="icon"
                onClick={() => deleteRecipe(recipe.id)}
                src={DeleteIcon}
              />
            </div>
          </div>

          <h1 className="DetailsRecipe-content--title">{recipe.name}</h1>
          <p className="DetailsRecipe-content--text">{recipe.instructions}</p>
        </div>
        <img
          className="DetailsRecipe-content--image"
          src={recipe.imageUrl || defaultImage[recipe.category]}
        />
      </div>
    </div>
  );
}
