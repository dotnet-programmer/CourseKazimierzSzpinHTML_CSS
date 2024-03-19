document.title = 'Nowy tytuł - JAVASCRIPT';

let links = document.getElementsByClassName('link-blog');
// links[0].style.fontSize = '50px';
for (let link of links) 
{
    link.style.fontSize = '50px';
}

function run()
{
    alert('ok');
}

function updateHeader()
{
    let header = document.getElementById('main-header');
    header.innerHTML = 'Zmieniono Header JS';
}

// deklaracja funkcji bezpośrednio w wywołaniu
// $(document).ready(function () {
//     alert('loaded');
// } );

// $ i jQuery w tych zapisach oznacza to samo
//jQuery(document).ready(function () {alert('loaded');} ); 

// deklaracja osobnej funkcji + wywołanie jej
// function showOnReady()
// {
//     alert('loaded 2');
// }
// $(document).ready(showOnReady());

$(document).ready(function () {
   $('#main-header').prop('innerHTML','jQuery 123'); // # oznacza odwołanie do id
   $('.title-center').css('background-color', 'green'); // . oznacza odwołanie do klasy
} );