
// Selectors
function $(s) {
    return document.querySelector(s);
}
function $$(s) {
    return document.querySelectorAll(s);
}
// createElement()
function createElement(tag, classList, content) {
    const element = document.createElement(tag);
    if(classList){
        element.setAttribute('class', classList);
    }
    if(content){
        element.innerHTML = content;
    }
    return element;
}
