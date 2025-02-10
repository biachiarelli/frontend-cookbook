
import Header from '../../components/Header'
import './style.scss'
import Cover from '../../assets/image/cover-add.png'
import api from '../../services/api'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import { defaultImageRecipe } from '../../shared/detaultImageRecipe'
import Alert from '../../components/Alert'
import Input from '../../components/Input'
import Select from '../../components/Select'
import TextArea from '../../components/TextArea'

export default function AddRecipe() {
    let { id } = useParams();
    const navigate = useNavigate()

    const nameInput = useRef()
    const categoryInput = useRef()
    const instructionsInput = useRef()
    const imageUrlInput = useRef()

    const [categories, setCategories] = useState([])
    const [imagePreview, setImagePreview] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [messageAlert, setMessageAlert] = useState('')
    const [variantAlert, setVariantAlert] = useState('success')

    const defaultImage = defaultImageRecipe;

    const propsHeader = {
        title: id ? 'Editar receita' : 'Nova receita',
        img: Cover,
        button: {
            label: id ? 'Voltar' : 'Lista de receitas',
            action: id ? goToDetailsRecipe : goToHomePage
        }
    }

    async function update() {
        try {
            await api.put('/recipes/' + id, {
                name: nameInput.current.value,
                category: categoryInput.current.value,
                imageUrl: imageUrlInput.current.value,
                instructions: instructionsInput.current.value
            })
            
            setShowAlert(true)
            setVariantAlert('success')
            setMessageAlert('Receita editada com sucesso!')

        } catch(error) {
            setShowAlert(true)
            setVariantAlert('error')
            setMessageAlert(error.message || 'Ocorreu um erro inesperado, tente novamente.')
            console.error(error)
        }
    }
    
    async function save() {
        try {
            await api.post('/recipes', {
                name: nameInput.current.value,
                category: categoryInput.current.value,
                imageUrl: imageUrlInput.current.value,
                instructions: instructionsInput.current.value
            })
            
            setShowAlert(true)
            setVariantAlert('success')
            setMessageAlert('Receita adicionada com sucesso!')

            cleanInputs()
        } catch(error) {
            setShowAlert(true)
            setVariantAlert('error')
            setMessageAlert(error.message || 'Ocorreu um erro inesperado, tente novamente.')
            console.error(error)
        }
    }

    function send() {       
        console.log(nameInput.current.value)
        console.log(imageUrlInput.current.value)
        console.log(categoryInput.current.value)
        console.log(instructionsInput.current.value)
        
        if( !nameInput.current.value ||
            !imageUrlInput.current.value ||
            !categoryInput.current.value ||
            !instructionsInput.current.value
        ) {
            
            setShowAlert(true)
            setVariantAlert('error')
            setMessageAlert('Todos os campos são obrigatórios')

            return
        }

        if(id) {
            update()
        } else {
            save()
        }
    }

    function cleanInputs() {
        nameInput.current.value = ''
        categoryInput.current.value = ''
        imageUrlInput.current.value = ''
        instructionsInput.current.value = ''
        
        setImagePreview()
    }

    function goToHomePage() {
        navigate('/');
    }

    function goToDetailsRecipe() {
        navigate('/receita/' + id)
    }

    function getCategory() {
        setCategories([
            {id: 1, label: 'Principal'},
            {id: 2, label: 'Doce'},
            {id: 3, label: 'Saudável'},
            {id: 4, label: 'Lanche'},
            {id: 5, label: 'Bebida'},
        ])
    }

    async function setUpdateInputs() {
        if(!id)
            return

        try {
            const res = await api.get('/recipes?id=' + id)
            const recipe = res.data[0]

            nameInput.current.value = recipe.name
            categoryInput.current.value = recipe.category
            imageUrlInput.current.value = recipe.imageUrl
            instructionsInput.current.value = recipe.instructions

            setImagePreview(recipe.imageUrl)
        } catch(error) {
            setShowAlert(true)
            setVariantAlert('error')
            setMessageAlert(error.message || 'Ocorreu um erro inesperado')
            console.error(error)
        }
    }

    function changeImage() {
        if(imageUrlInput.current && imageUrlInput.current.value){
            console.log(imageUrlInput.current.value)
            setImagePreview(imageUrlInput.current.value)
        } else {
            setImagePreview()
        }
    }
    
    useEffect(() => {
        getCategory()
        setUpdateInputs()
    }, [])

    return (
        <div className='AddRecipe'>
            <Alert 
                message={messageAlert}
                show={showAlert} 
                actionClose={() => setShowAlert(false)}
                variant={variantAlert} 
                duration={4000}
            />
            <Header props={propsHeader} />
            <div className='AddRecipe-content'>
                <form className='AddRecipe-form'>
                    <Input label='Nome' name='name' ref={nameInput}  />
                    <Input label='Url da imagem' name='imageUrl' ref={imageUrlInput} onBlur={changeImage} />
                    <Select label='Categoria' name='categoria' ref={categoryInput} options={ categories } />
                    <TextArea label='Instruções' name='instructions' rows={12} ref={instructionsInput} />
                    <Button label='Salvar receita' action={send} />
                    
                </form>
                <img className='AddRecipe-image' src={ imagePreview || defaultImage['default']} />
            </div>
        </div>
    )
  }