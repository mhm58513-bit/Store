
//Page Home


// Get Data From API

let btnBuyNow = document.getElementById("btn")
let cards = document.querySelector(".items")

let Products = []

function Api() {
    let xhr = new XMLHttpRequest()

    xhr.open("GET", "https://fakestoreapi.com/products", true)

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            Products = JSON.parse(this.responseText)
            DisplayUI(Products)
        }
    })

    xhr.send()
}

Api()


// display UI Products


function DisplayUI(Products) {

    cards.innerHTML = ""

    Products.forEach(Product => {
        cards.innerHTML += `
            <div class="card">
                <img src="${Product.image}" alt="${Product.title}" />
                <h2>${Product.title.substring(0, 20)}</h2>
                <p>${Product.description.substring(0, 50)}</p>
                <h3>${Product.price}</h3>
                <button 
                    class="btnbuy"
                    data-id="${Product.id}"
                    data-img="${Product.image}"
                    data-title="${Product.title}"
                    data-des="${Product.description}"
                    data-price="${Product.price}">
                    Buy Now
                </button>
            </div>
            `
    })
}



// user logged

let Alog = document.getElementById("Alog")
let user = JSON.parse(localStorage.getItem("session"))
let CountShopIcon = document.getElementById("count")
let Order = JSON.parse(localStorage.getItem("Order"))

function User() {
    if (user) {
        Alog.innerHTML = "Hi " + user.name

        CountShopIcon.textContent = Order.length 

        Alog.href = "./Login/profile.html"
    } else {
        CountShopIcon.textContent = 0

        Alog.href = "./Login.html"
    }
}

User()


// Order Products


setTimeout(() => {
    let btnbuy = document.querySelectorAll(".btnbuy")

    btnbuy.forEach((btn) => {
        btn.addEventListener("click", () => {


            let Products = JSON.parse(localStorage.getItem("product") || "[]")

            let newpro = {
                idcust: user?.id,
                idOrder: btn.dataset.id,
                img: btn.dataset.img,
                title: btn.dataset.title,
                des: btn.dataset.des,
                price: btn.dataset.price,
            }

            Products.push(newpro)

            localStorage.setItem("product", JSON.stringify(Products))
            
        })

    })
}
    , 1000)


// Search and Filter Products

let search = document.getElementById("Search")

search.addEventListener("input", (e) => {
    let ValueSearch = e.target.value.toLowerCase()
    let filteredProducts = Products.filter((product) => {
       return product.title.toLowerCase().includes(ValueSearch)
    })

    DisplayUI(filteredProducts)
    console.log(ValueSearch)
})





