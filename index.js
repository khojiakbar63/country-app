import {$} from './assets/js/utils.js'

const modeIcon = $('#mode-label i')
const modeInput = $('#checkbox')
const modeText = $('#mode-text')



modeInput.addEventListener('change', () =>{
    modeIcon.classList.toggle('bi-moon')
    modeIcon.classList.toggle('bi-sun')

    if(modeText.textContent === 'Dark Mode') {
        modeText.textContent = 'Light Mode'
    }else{
        modeText.textContent = 'Dark Mode'
    }
    // console.log(modeText.textContent);
})