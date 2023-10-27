const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/'
const GET_ALL_COCKTAILS = baseURL + 'filter.php?c=Cocktail'
const GET_BY_NAME = baseURL + 'search.php?s='
const FILTER_BY_ALCO = baseURL + 'filter.php?a='
const GET_BY_ID = baseURL + 'lookup.php?i='
const GET_INGR = baseURL + 'search.php?i='

const form = document.querySelector('#search')
const input = document.querySelector('#inp')
const select = document.querySelector('#select')
const output = document.querySelector('#output')

const getCocktails = async () => {
    const req = await fetch(GET_ALL_COCKTAILS)
    const res = await req.json()
    renderCocktails(res.drinks);
}

const getCocktailsByName = async () => {
    let req
    if (input.value.length >= 2) {
        req = await fetch(GET_BY_NAME + input.value)
    } else {
        req = await fetch(GET_ALL_COCKTAILS)
    }
    const res = await req.json()
    renderCocktails(res.drinks);
}

const getByFilter = async () => {
    let req
    if (select.value == 'All') {
        req = await fetch(GET_ALL_COCKTAILS)
    } else {
        req = await fetch(FILTER_BY_ALCO + select.value)
    }
    const res = await req.json()
    renderCocktails(res.drinks);
}

const getCocktailDetail = async (id) => {
    const req = await fetch(GET_BY_ID + id)
    const res = await req.json()
    renderDetail(res.drinks[0]);
}

const getIngr = async (name) => {
    const req = await fetch(GET_INGR + name)
    const res = await req.json()
    renderIngr(res.ingredients[0]);
}

const renderIngr = (data) => {
    console.log(data);
    output.innerHTML = ''
    const card = document.createElement('div')
    const img = document.createElement('img')
    const title = document.createElement('h1')
    const description = document.createElement('p')
    img.src = `https://www.thecocktaildb.com/images/ingredients/${data.strIngredient}-Medium.png`

    card.append(img, title, description)
    output.append(card)
}



const renderDetail = (cocktail) => {
    output.innerHTML = ''
    console.log(cocktail);
    const card = document.createElement('div')
    const cocktailImg = document.createElement('img')
    const title = document.createElement('h2')
    cocktailImg.src = cocktail.strDrinkThumb
    title.textContent = cocktail.strDrink

    card.append(cocktailImg, title)
    output.append(card)

    for (let key in cocktail) {
        if (key.includes('strIngredient') && cocktail[key] !== null) {
            const ingr = document.createElement('li')
            ingr.textContent = cocktail[key]
            card.append(ingr)
            ingr.addEventListener('click', () => getIngr(cocktail[key]))
        }
    }
}

const renderCocktails = (data) => {
    output.innerHTML = ''
    // console.log(data);
    data ?
        data.map(el => {
            // console.log(el);
            const card = document.createElement('div')
            const cocktailImg = document.createElement('img')
            const title = document.createElement('h2')
            cocktailImg.src = el.strDrinkThumb
            title.textContent = el.strDrink

            card.append(cocktailImg, title)
            output.append(card)
            card.addEventListener('click', () => getCocktailDetail(el.idDrink))
        })
        :
        output.innerHTML = '<h1>Server Error</h1>'
}

form.addEventListener('submit', (e) => e.preventDefault())
input.addEventListener('keydown', getCocktailsByName)
select.addEventListener('change', getByFilter)

getCocktails()