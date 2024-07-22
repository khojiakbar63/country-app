const backBtn = $('#back-btn')





// Back btn
backBtn.addEventListener('click', ()=>{
    location.href = '/index.html'
})

const countryCode = localStorage.getItem('selectedCountryCode')
const detailCard = $('.detail-card')

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
            <h2 class="card-title">${country.name.common}</h2>
            <div class="detail-card-body">
                <div>
                    <p><strong>Native Name: </strong><span>${country.name.common}</span><br></p>
                    <p><strong>Population: </strong><span>${country.population}</span><br></p>
                    <p><strong>Region: </strong><span>${country.region}</span><br></p>
                    <p><strong>Sub Region: </strong><span>${country.subregion}</span><br></p>
                    <p><strong>Capital: </strong><span>${country.capital ? country.capital[0] : 'No Capital'}</span><br></p>
                </div>
                <div>
                    <p><strong>Top Level Domain: </strong><span>${country.tld}</span><br></p>
                    <p><strong>Currencies: </strong><span>${Object.values(country.currencies).map(currency=> currency.name).join(', ')}</span><br></p>
                    <p><strong>Languages: </strong><span>${Object.values(country.languages).join(', ')}</span></p>
                </div>
            </div>

            <div class="neighbours">
                <strong>Border Countries:</strong>
                <span>
                    ${country.borders ? country.borders.map(el => `<button class='item'>${el}</button>` ).join('') : 'No borders'}
                </span>
            </div>
        </div>
        `
        
    })
}else {
    detailCard.innerHTML = '<h1>Data not found</h1>'
}