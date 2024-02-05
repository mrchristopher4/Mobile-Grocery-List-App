import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-206c3-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const CoffeeSelectListInDB = ref(database, "CoffeeSelectList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const CoffeeSelectListEl = document.getElementById("CoffeeSelect-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(CoffeeSelectListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(CoffeeSelectListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearCoffeeSelectListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToCoffeeSelectListEl(currentItem)
        }    
    } else {
        CoffeeSelectListEl.innerHTML = "No items here... yet"
    }
})

function clearCoffeeSelectListEl() {
    CoffeeSelectListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToCoffeeSelectListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `CoffeeSelectList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    CoffeeSelectListEl.append(newEl)
}