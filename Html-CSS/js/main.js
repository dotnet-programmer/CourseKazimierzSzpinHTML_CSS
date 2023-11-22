// ********************  Collapisble  ********************

var collapsibles = document.querySelectorAll('.collapsible')
collapsibles.forEach(item =>
  item.addEventListener('click', function () {
    this.classList.toggle('collapsible--expanded')
  })
)

// ********************  Write-text  ********************

// pobranie elementu poprzez jego ID
var textSpan = document.getElementById('write-text')

// ustawienie tekstu, który ma zostać napisany
var text =
  'Tworzenie stron internetowych nie musi być trudne - naucz się HTML i CSS z naszym szkoleniem!'

// ustawienie indeksu początkowego
var index = 1

// wywołanie funkcji wypisującej tekst
writeText()

// funkcja wypisująca tekst
function writeText () {
  // właściwość innerText - odniesienie się do tekstu w elemencie textSpan i zmiana jego wartości
  // funkcja wywołana na tekście - slice(start-index, end-index) - pobiera wycinek tekstu od indexu początkowego do indeksu końcowego
  textSpan.innerText = text.slice(0, index)

  // zwiększ index, czyli o literę dalej
  index++

  // if (index > text.length) {
  //   setTimeout(function () {
  //     index = 1
  //     setTimeout(writeText, 60)
  //   }, 2000)
  //   return
  // }

  // setTimeout - funkcja wywołująca inną funkcję po określonym czasie, wykonuje się tylko 1 raz, której parametry to:
  // - nazwa funkcji która ma się wywołać
  // - czas w milisekundach, po którym dana funkcja ma się wykonać
  // zwraca id ustawionego timera, można je użyć w funkcji clearTimeout(id) do anulowania wykonania tego timera
  if (index > text.length) {
    index = 1
    setTimeout(writeText, 2000)
    return
  }

  setTimeout(writeText, 60)
}

// ********************  Countdown  ********************

var countDownDate = new Date('2023-12-06 22:00:00').getTime()

// setInterval - cykliczne wywołanie metody co podany czas
var intervalCountDownDate = setInterval(function () {
  var now = new Date().getTime()
  var distance = countDownDate - now

  var days = 0
  var hours = 0
  var minutes = 0
  var seconds = 0

  if (distance > 0) {
    days = Math.floor(distance / (1000 * 60 * 60 * 24))
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    seconds = Math.floor((distance % (1000 * 60)) / 1000)
  }
  // jeśli termin minął to zakończ cykliczne wywoływanie funkcji
  else {
    clearInterval(intervalCountDownDate)
  }

  // elementy span z html, na nich są wyświetlane wartości
  var daysSpan = document.getElementsByClassName('countdown-timer__days')
  var hoursSpan = document.getElementsByClassName('countdown-timer__hours')
  var minutesSpan = document.getElementsByClassName('countdown-timer__minutes')
  var secondsSpan = document.getElementsByClassName('countdown-timer__seconds')

  // innerHTML - edytuje zawartość znacznika html, w typ przypadku wstawia nową wartość między <span> a </span>
  for (var daySpan of daysSpan)
    daySpan.innerHTML =
      days + "<small class='countdown-timer__label'>Dni</small>"

  for (var hourSpan of hoursSpan)
    hourSpan.innerHTML =
      hours + "<small class='countdown-timer__label'>Godzin</small>"

  for (var minuteSpan of minutesSpan)
    minuteSpan.innerHTML =
      minutes + "<small class='countdown-timer__label'>Minut</small>"

  for (var secondSpan of secondsSpan)
    secondSpan.innerHTML =
      seconds + "<small class='countdown-timer__label'>Sekund</small>"
}, 1000)

// ********************  Counters  ********************

// pobranie z html całego bloku z licznikami
var box = document.getElementById('counter-block')

// pobranie z html elementów na których będą wyświetlane wyliczenia
var counters = document.getElementsByClassName('counter')

// podpięcie się pod zdarzenie "scroll", przy każdym scrollowaniu będzie wywoływana funkcja
document.addEventListener('scroll', checkCounterIsInViewPort, { passive: true })

var checkCounterIsInViewPort = function () {
  if (!isInViewport(box)) return

  // przejdź po wszystkich elementach
  for (var counter of counters) {
    // najpierw ustaw wartość początkową
    counter.innerText = '0'
    // później uaktualnij tą wartość nowym wyliczeniem
    updateCounter(counter)
  }

  // usuń podpięcie pod zdarzenie scroll, po to żeby wyliczenie zrobiło się tylko przy 1 pokazaniu
  document.removeEventListener('scroll', checkCounterIsInViewPort)
}

// funkcja sprawdzająca czy użytkownik ma na ekranie wybraną sekcję
// parametrem funkcji jest jakiś element pobrany z html
function isInViewport (element) {
  // pobranie współrzędnych elementu
  var rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function updateCounter (counterParam) {
  // znak + na początku oznacza że pobtana wartość ma być zapisana jako liczba
  var targetValue = +counterParam.getAttribute('data-target')
  var actualValue = +counterParam.innerText

  // określenie w ilu krokach ma sie zwiększać wartość od początku do końca
  var increment = targetValue / 300

  if (actualValue < targetValue) {
    // actualValue + increment - tutaj pewnie będą jakieś liczby z przecinkiem, więc Math.ceil zaokrągla do całkowitych
    counterParam.innerText = `${Math.ceil(actualValue + increment)}`
    setTimeout(updateCounter, 1, counterParam)
  } else {
    counterParam.innerText = targetValue
  }
}

// ********************  Carousel  ********************

var opinionAll = document.getElementsByClassName('carousel__all')[0]
var rightArrow = document.getElementsByClassName('carousel__arrow-right')[0]
var leftArrow = document.getElementsByClassName('carousel__arrow-left')[0]

var opinions = document.getElementsByClassName('carousel__content')
var dots = document.getElementsByClassName('carousel__dot')

var indexCarousel = 0

var interval = setInterval(startCarousel, 4000)

// funkcja rozpoczynająca przewijanie slajdów
function startCarousel () {
  indexCarousel++
  changeOpinion()
}

function changeOpinion () {
  // jeśli ostatni element i w prawo, to przejdź na początek, a jeśli pierwszy i w lewo, to idź na ostatni
  if (indexCarousel > opinions.length - 1) {
    indexCarousel = 0
  } else if (indexCarousel < 0) {
    indexCarousel = opinions.length - 1
  }

  // przesunięcie w lewo o 60% vh
  opinionAll.style.transform = `translateX(${-indexCarousel * 60}vw)`

  // usunięcie zaznaczenia z kropki
  var filledDots = document.getElementsByClassName('carousel__dot--fill')
  for (var elements of filledDots) {
    elements.classList.remove('carousel__dot--fill')
  }

  // dodanie zaznaczenia na odpowiedniej kropce
  dots[indexCarousel].classList.add('carousel__dot--fill')
}

// zdarzenie click na prawej strzałce
rightArrow.addEventListener('click', function () {
  indexCarousel++
  changeOpinion()
  resetInterval()
})

// zdarzenie click na lewej strzałce
leftArrow.addEventListener('click', function () {
  indexCarousel--
  changeOpinion()
  resetInterval()
})

function resetInterval () {
  clearInterval(interval)
  interval = setInterval(startCarousel, 4000)
}

// ********************  Modal  ********************
// pobranie elementu który będzie wyświetlany jako okno modalne
// skrypt js działa na obu stronach, a na głównej nie ma elementu o takim id czy klasie, więc skrypt będzie powodował błędy
// żeby tego uniknąć, można albo tutaj dodać sprawdzanie czy element nie jest pusty, albo w html dodać jakiś pusty znacznik z takim id/klasą
var modal = document.getElementById('my-modal')
var btns = document.getElementsByClassName('modal-open')

// element wyświetlający info o poprawnym zapisaniu do newslettera
var modalSuccess = document.getElementsByClassName('modal__success')[0]
modalSuccess.style.display = 'none'

// dodanie do przycisków akcji onclick, żeby pokazywały element okno modalne
for (var btn of btns) {
  btn.onclick = function () {
    modal.style.display = 'block'
  }
}

// zamykanie okna modalnego poprzez kliknięcie przycisku X
var spanClose = document.getElementsByClassName('modal__close')[0]
spanClose.onclick = function () {
  modal.style.display = 'none'
  modalSuccess.style.display = 'none'
}

// zamykanie okna modalnego poprzez kliknięcie w wyszarzonym obszarze poza oknem modalnym
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
    modalSuccess.style.display = 'none'
  }
}

// funkcja wywołana po kliknięciu przycisku submit
function submitForm () {
  var form = document.getElementById('my-form')

  // sprawdzenie błędów walidacji
  if (!form.checkValidity()) {
    form.reportValidity()
  } else {
    // przesłanie informacji na serwer używając ajaxa
    callAjax()
  }
}

function callAjax () {
  // pobranie i zmiana wartości display żeby pokazać spinnera
  document.getElementById('loader').style.display = 'flex'

  // pobranie wpisanego adresu email z ucięciem białych znaków na początku i końcu
  var emailInputValue = document.getElementById('email').value.trim()

  $.ajax({
    // endpoint - adres gdzie dane będa wysyłane
    url: 'https://formspree.io/f/xjvdybyk',
    headers: {
      Accept: 'application/json'
    },
    type: 'POST',
    data: {
      email: emailInputValue
    },
    // jeśli wszystko się powiedzie
    success: function () {
      // testowe sprawdzenie czy sukces
      console.log('success')
      // pobranie elementu z formularza i wyzerowanie go
      document.getElementById('email').value = ''
      // pokazanie info o poprawnym zapisaniu się do newslettera
      modalSuccess.style.display = 'block'
      // ukrycie spinnera
      document.getElementById('loader').style.display = 'none'
    },
    // jeśli coś pójdzie nie tak
    error: function () {
      console.log('error')
      // ukrycie spinnera
      document.getElementById('loader').style.display = 'none'
    }
  })
}

// ********************  Block right click  ********************
document.addEventListener(
  'contextmenu',
  e => {
    e.preventDefault()
  },
  false
)

// ********************  Disable View Source  ********************
document.addEventListener('keydown', e => {
  // USE THIS TO DISABLE CONTROL AND ALL FUNCTION KEYS
  // if (e.ctrlKey || (e.keyCode>=112 && e.keyCode<=123)) {

  // THIS WILL ONLY DISABLE CONTROL AND F12
  if (e.ctrlKey || e.keyCode == 123) {
    e.stopPropagation()
    e.preventDefault()
  }
})
