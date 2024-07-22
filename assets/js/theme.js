const URL = 'https://restcountries.com/v3.1'

const modeIcon = $('#mode-label i')
const modeInput = $('#checkbox')
const modeText = $('#mode-text')
const checkbox = $('#checkbox')
const header = $('#header')
const main = $('main')
const search = $('#search')
// const searchInput = $('#search-input')
// const searchInput = $('#search-input')
const selectRegion = $('#select-region')

// const isDark = localStorage.getItem('isDark') || 'light'

modeInput.addEventListener('change', (e) =>{
    
    if(e.target.checked){
        localStorage.setItem( 'isDark' , 'dark')
    }else{
        localStorage.setItem('isDark', 'light')
    }

    changeScreen(localStorage.getItem('isDark'))

    if(modeText.textContent === 'Dark Mode') {
        modeText.textContent = 'Light Mode'
    }else{
        modeText.textContent = 'Dark Mode'
    }
    fetchCountries(URL).then((res)=>{
        renderOnBrowser(res, localStorage.getItem('isDark') || 'light')
    })
   

})

// (function(){
//    const date = new Date()
//    const h = date.getHours()
//    const m = date.getMinutes()
//    const s = date.getSeconds()

//    console.log(h,  m, s);

// })()

function changeScreen(type){
    if(type === 'dark'){

        modeIcon.classList.remove('bi-moon')
        modeIcon.classList.add('bi-sun')

        header.classList.add('bg-dark')
        main.classList.add('bg-light-dark')
        search.classList.add('bg-dark')
        searchInput.classList.add('bg-dark')
        selectRegion.classList.add('bg-dark')
    }else{
        modeIcon.classList.add('bi-moon')
        modeIcon.classList.remove('bi-sun')

        header.classList.remove('bg-dark')
        main.classList.remove('bg-light-dark')
        search.classList.remove('bg-dark')
        searchInput.classList.remove('bg-dark')
        selectRegion.classList.remove('bg-dark')
    }
}

changeScreen(localStorage.getItem('isDark') || 'light')