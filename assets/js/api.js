const baseURL = 'https://restcountries.com/v3.1'

// Fetch All Countries
async function fetchCountries() {
   try{
    const response = await fetch(`${baseURL}/all`);
    const data = await response.json();
    return data
   }
   catch(err){
    console.error(err);
   }
}

// Fetch Countries by Region
async function fetchCountriesByRegion(region) {
     try{
          const res = await fetch(`${baseURL}/region/${region}`)
          const req = await res.json()
          cards.innerHTML = ''
          renderOnBrowser(req)
     }

     catch(err){
          alert(err)
     }
}
