const cards = $('#cards')
const logo = $('#logo')
const detailCard = $('.detail-card')

let isTheme = localStorage.getItem('isDark') || 'dark'
const searchInput = $('#search-input')
// console.log(localStorage.getItem('isDark'));
// Render On Browser
function renderOnBrowser(db, theme){
    db.length && db.forEach(country =>  {
        const card = createElement('div', `card ${isTheme === 'dark' ? 'dark-card' : 'light-card'}`, `
        <img src="${country.flags.svg}" alt="flag">
        <div class="card-body" data-id=${`id${Math.floor((Math.random() * 100000) + 1)}`}>
            <h3 class="card-title">${country.name.common}</h3>
            <strong>Population:</strong><span>${country.population}</span>
            <strong>Region:</strong><span>${country.region}</span><br>
            <strong>Capital:</strong><span>${country.capital ? country.capital[0] : 'No Capital'}</span>
            <div class='flex items-center justify-between mt-[10px]'>
                <div></div>
                <button  id='card-btn' data-id='${country.cca3}'">See more...</button>
            </div>
        </div>
`)

const countryCode = localStorage.getItem('selectedCountryCode')

// Card Click
cards.addEventListener('click', (e)=>{

    if(e.target.getAttribute('id') === 'card-btn' && e.target.tagName  === 'BUTTON'){
        const countryCode = e.target.getAttribute('data-id')
        localStorage.setItem('selectedCountryCode', countryCode);
        location.href = './pages/detail.html';
    }

   
})



cards.appendChild(card)
    });    
}
fetchCountries(baseURL).then((res)=>{
    renderOnBrowser(res, isTheme)
})

// Search
searchInput.addEventListener('input', (e)=>{
    const inputValue = e.target.value.toLowerCase()
    fetchCountryData (inputValue)
})
async function fetchCountryData (inputValue){
    try{
        cards.innerHTML = ''
        const res = await fetch(`${baseURL}/all`)
        const countries = await res.json()
        const foundCountries = countries.filter(country => {
            return country.name.common.toLowerCase().includes(inputValue)
        })
        renderOnBrowser(foundCountries, isTheme)
    }catch(err){
        alert(err);
    }
}



// Filter By Region
$('#select-region').addEventListener('change', (e) => {
    fetchCountriesByRegion(e.target.value)
})


logo.addEventListener('click', ()=>{
    location.href = './pages/detail.html'
})
