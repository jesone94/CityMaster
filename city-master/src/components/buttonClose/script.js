//document.querySelector('menu-icon').onclick=function(){
	//this.classList.toggle('menu-icon-active')
	//console.log(4)
//}
let elem = document.querySelector('.menu-icon');
document.querySelector('.menu-icon-wrapper').addEventListener('click', function(){
	elem.classList.toggle('menu-icon-active')
	console.log("!")
})

//let elem = document.getElementByID('divok');
//elem.addEventListener("click", function(){
	//console.log('!')
	//elem.classList.toggle('menu-icon-active')
//})


function helloFunction(){
	console.log('hi')
}
document.querySelector('#sss').addEventListener("click", helloFunction)

let searchInput=document.querySelector('search')
let searchButton=document.querySelector('searchButton')

document.querySelector('#searchButton').addEventListener('click', search)

function search(){
	document.getElementById("inner").innerHTML=("we want to find this "+ document.querySelector('#search').value)
}