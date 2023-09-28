//function init (){
// imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
  databaseURL: /* insert firebase url*/
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const mainListInDB = ref(database, "mainList")

// elements
const inputFieldEl = document.getElementById('input-field')
const addButtonEl = document.getElementById('add-button')
const mainListEl = document.getElementById('the-list')
const deleteBtnEl = document.querySelector('delete-btn')

//const itemEl = document.querySelector('li')

//EventListners
addButtonEl.addEventListener("click", function () {
  if (inputFieldEl.value !== '' && mainListEl.getElementsByTagName('li').length < 25) {
    let inputValue = inputFieldEl.value
    push(mainListInDB, inputValue)
    clearInputFieldEl()
  }
  else if (inputFieldEl.value == '') {
    alert("Input field can\'t be empty")
  }
  else {
    alert("max items reached!")
  }
})

inputFieldEl.addEventListener('keypress', function (e) {
  if (e.key === "Enter") {
    e.preventDefault()
    addButtonEl.click()
  }
})

onValue(mainListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())

    clearMainListEl()

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i]
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]

      appendItemToMainListEl(currentItem)
    }
  } else {
    mainListEl.innerHTML = "No items here... yet"

  }
})
//functions

const clearMainListEl = () => {
  mainListEl.innerHTML = ''
}

const clearInputFieldEl = () => {
  inputFieldEl.value = ''
}

function appendItemToMainListEl(item) {
  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")
  let newDivEl = document.createElement("div")
  let newImgEl = document.createElement("img")

  newEl.textContent = itemValue
  newImgEl.src = "../assets/close.svg"
  newImgEl.classList.add('close')
  newEl.append(newImgEl)
  //newDivEl.append(newImgEl)
  newImgEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `mainList/${itemID}`)

    remove(exactLocationOfItemInDB)
  })

  mainListEl.append(newEl)
}

//}
//window.addEventListener('DOMContentLoaded', init)
