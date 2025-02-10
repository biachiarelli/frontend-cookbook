import Header from '../../components/Header';
import './style.scss';
import Cover from '../../assets/image/cover.png';
import api from '../../services/api';
import { useEffect, useRef, useState } from 'react';
import CardRecipe from '../../components/CardRecipe';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import CardCategory from '../../components/CardCategory';

export default function Home() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [variantAlert, setVariantAlert] = useState('success');
  const [searchTerm, setSearchTerm] = useState('');
  const searchInput = useRef('');

  const propsHeader = {
    title: 'Livro de receitas',
    subtitle: 'Suas receitas favoritas em um só lugar',
    img: Cover,
    button: {
      label: 'Adicionar nova receita',
      action: goToAddRecipePage,
    },
  };

  function goToAddRecipePage() {
    navigate('/adicionar-receita');
  }

  async function getRecipes(params = '') {
    try {
      const res = await api.get('/recipes' + params);

      setRecipes(res.data);
    } catch (error) {
      setShowAlert(true);
      setVariantAlert('error');
      setMessageAlert(error.message || 'Ocorreu um erro inesperado');
      console.error(error);
    }
  }

  function getCategories() {
    setCategories([
      { id: 0, label: 'Todos' },
      { id: 1, label: 'Principal' },
      { id: 2, label: 'Doce' },
      { id: 3, label: 'Saudável' },
      { id: 4, label: 'Lanche' },
      { id: 5, label: 'Bebida' },
    ]);
  }

  async function deleteRecipe(id) {
    try {
      await api.delete('/recipes/' + id);

      setMessageAlert('Receita deletada com sucesso');
      setVariantAlert('success');
      setShowAlert(true);

      getRecipes();
    } catch (error) {
      setShowAlert(true);
      setVariantAlert('error');
      setMessageAlert(error.message || 'Ocorreu um erro inesperado');
      console.error(error);
    }
  }

  function editRecipe(id) {
    navigate('/adicionar-receita/' + id);
  }

  function goToDetailsRecipe(id) {
    navigate('/receita/' + id);
  }

  function clickCategory(category) {
    if (category === 'Todos') {
      getRecipes();
    } else {
      getRecipes('?category=' + category);
    }
  }

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const searchByName = debounce(() => {
    const value = searchInput.current.value;
    getRecipes('?name=' + value);
  }, 300);

  function handleChange(event) {
    setSearchTerm(event.target.value);
    searchByName();
  }

  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);

  return (
    <div className="Home">
      <Alert
        message={messageAlert}
        show={showAlert}
        actionClose={() => setShowAlert(false)}
        variant={variantAlert}
        duration={3000}
      />
      <Header props={propsHeader} />

      <div className="Home-container">
        <div className="Home-category">
          {categories.map((item) => (
            <CardCategory
              key={item.id}
              label={item.label}
              click={() => clickCategory(item.label)}
            />
          ))}
        </div>

        {recipes.length > 0 && (
          <>
            <div className="Home-search">
              <input
                className="Home-search--input"
                placeholder="Buscar pelo nome da receita"
                value={searchTerm}
                onChange={handleChange}
                ref={searchInput}
              />
            </div>
            <div className="Home-list">
              {recipes.map((item) => (
                <CardRecipe
                  key={item.id}
                  category={item.category}
                  imageUrl={item.imageUrl}
                  id={item.id}
                  name={item.name}
                  instructions={item.instructions}
                  deleteAction={() => deleteRecipe(item.id)}
                  editAction={() => editRecipe(item.id)}
                  detailsAction={() => goToDetailsRecipe(item.id)}
                />
              ))}
            </div>
          </>
        )}

        {recipes.length === 0 && (
          <div className="Home-empty">Nenhum resultado encontrado</div>
        )}
      </div>
    </div>
  );
}
