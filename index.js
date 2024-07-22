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
            
            <button id='card-btn' data-id='${country.cca3}'">Detail</button>
        </div>
`)

const countryCode = localStorage.getItem('selectedCountryCode')

// Card Click
cards.addEventListener('click', (e)=>{

    if(e.target.getAttribute('id') === 'card-btn' && e.target.tagName  === 'BUTTON'){
        const countryCode = e.target.getAttribute('data-id')
        localStorage.setItem('selectedCountryCode', countryCode);
        location.href = '/pages/detail.html';
    }

    if(countryCode){
        fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(res => res.json())
        .then(data => {
            const country = data[0]
            console.log(country);
            detailCard.innerHTML = ''
            detailCard.innerHTML = `
            <img class="detail-img" src="${country.flags.svg}" alt="flag">

            <div class="detail-card-wrapper flex flex-start flex-col" >
                <h2 class="card-title">Germany</h2>
                <div class="detail-card-body">
                    <div>
                        <p><strong>Native Name: </strong><span>Germany</span><br></p>
                        <p><strong>Population: </strong><span>234 567 87 654</span><br></p>
                        <p><strong>Region: </strong><span>Europe</span><br></p>
                        <p><strong>Sub Region: </strong><span>Western Europe</span><br></p>
                        <p><strong>Capital: </strong><span>Berlin</span><br></p>
                    </div>
                    <div>
                        <p><strong>Top Level Domain: </strong><span>:ge</span><br></p>
                        <p><strong>Currencies: </strong><span>Euro</span><br></p>
                        <p><strong>Languages: </strong><span>German, English, Russian</span></p>
                    </div>
                </div>

                <div class="neighbours">
                    <strong>Border Countries:</strong><span><button>France</button><button>Ukraine</button><button>Russia</button></span>
                </div>
            </div>
            `
            
        })
    }else {
        detailCard.innerHTML = '<h1>Data not found</h1>'
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
