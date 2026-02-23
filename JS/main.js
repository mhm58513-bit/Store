// =============================
// Page Home
// =============================

// Elements
let cards = document.querySelector(".items")
let Spin = document.querySelector(".LoadingDiv")
let Alog = document.getElementById("Alog")
let CountShopIcon = document.getElementById("count")

let user = JSON.parse(localStorage.getItem("session")) || null
let Products = []
let ProductsLS = JSON.parse(localStorage.getItem("product")) || []

// =============================
// API
// =============================

function Api() {
    let xhr = new XMLHttpRequest()

    xhr.open("GET", "https://fakestoreapi.com/products", true)

    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            Products = JSON.parse(this.responseText)

            Spin.style.display = "none"
            cards.style.display = "flex"
            DisplayUI(Products)
        }
    })

    xhr.send()
}

Api()

// =============================
// Display UI
// =============================

function DisplayUI(products) {

    cards.innerHTML = ""

    products.forEach(Product => {
        cards.innerHTML += `
            <div class="card">
                <img src="${Product.image}" />
                <h2>${Product.title.substring(0, 20)}</h2>
                <p>${Product.description.substring(0, 50)}</p>
                <h3>${Product.price} $</h3>

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

    addToCart()
}

// =============================
// User
// =============================

function User() {
    if (user) {
        Alog.innerHTML = "Hi " + user.name
        Alog.href = "./Login/profile.html"
    } else {
        Alog.innerHTML = "Login"
        Alog.href = "./Login.html"
        CountShopIcon.textContent = 0
    }
}

User()

// =============================
// Update Cart Count (TOTAL QUANTITY)
// =============================

function updateCartCount() {

    if (!user) {
        CountShopIcon.textContent = 0
        return
    }

    let userProducts = ProductsLS.filter(p => p.idcust === user.id)

    let totalQty = 0

    userProducts.forEach(item => {
        totalQty += item.quantity
    })

    CountShopIcon.textContent = totalQty
}

updateCartCount()

// =============================
// Add To Cart
// =============================

function addToCart() {

    let btnbuy = document.querySelectorAll(".btnbuy")

    btnbuy.forEach((btn) => {

        btn.addEventListener("click", () => {

            if (!user) {
                window.location = "./Login.html"
                return
            }

            let id = Number(btn.dataset.id)

            let exist = ProductsLS.find(item =>
                item.idOrder == id && item.idcust === user.id
            )

            if (exist) {

                // لو المنتج موجود نزود الكمية
                exist.quantity += 1

            } else {

                // لو جديد نضيفه
                ProductsLS.push({
                    idcust: user.id,
                    idOrder: id,
                    img: btn.dataset.img,
                    title: btn.dataset.title,
                    des: btn.dataset.des,
                    price: Number(btn.dataset.price),
                    quantity: 1
                })
            }

            localStorage.setItem("product", JSON.stringify(ProductsLS))

            updateCartCount()
        })
    })
}

// =============================
// Search
// =============================

let search = document.getElementById("Search")

search.addEventListener("input", (e) => {

    let value = e.target.value.toLowerCase()

    let filteredProducts = Products.filter((Product) => {
        return Product.title.toLowerCase().includes(value)
    })

    DisplayUI(filteredProducts)
})