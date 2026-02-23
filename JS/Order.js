// =============================
// page orders
// =============================

// get logged in

let Alog = document.getElementById("Alog")
let cards = document.querySelector(".items")

let user = JSON.parse(localStorage.getItem("session")) || null
let Products = JSON.parse(localStorage.getItem("product")) || []

// =============================
// Check User
// =============================

function User() {

    if (user) {
        Alog.innerHTML = "Hi " + user.name
        Alog.href = "./Login/profile.html"
    } else {
        Alog.innerHTML = "Login"
        Alog.href = "./Login.html"
    }
}

User()

// =============================
// Remove Repeat Orders + Add Quantity
// =============================

function RemoveRepeatOrder() {

    if (!user) return

    let userProducts = Products.filter(item => item.idcust === user.id)

    let cleanProducts = []

    userProducts.forEach((item) => {

        let exist = cleanProducts.find(p => p.idOrder === item.idOrder)

        if (exist) {
            exist.quantity += 1
        } else {
            cleanProducts.push({
                ...item,
                quantity: item.quantity ? item.quantity : 1
            })
        }

    })

    // نحذف منتجات اليوزر القديمة
    Products = Products.filter(item => item.idcust !== user.id)

    // نضيف النسخة النظيفة
    Products = [...Products, ...cleanProducts]

    localStorage.setItem("product", JSON.stringify(Products))
}

RemoveRepeatOrder()

// =============================
// Get User Orders
// =============================

function getProduct() {

    if (!user) return

    let orderuser = Products.filter((Product) => {
        return Product.idcust === user.id
    })

    DisplayUI(orderuser)
}

getProduct()

// =============================
// Create Display UI
// =============================

function DisplayUI(Order) {

    cards.innerHTML = ""

    if (Order.length === 0) {
        cards.innerHTML = "<h2>No Orders Yet</h2>"
        return
    }

    Order.forEach((item) => {

        cards.innerHTML += `
            <div class="card">
                <img src="${item.img}" alt="${item.title}" />
                <h2>${item.title.substring(0, 20)}</h2>
                <p>${item.des.substring(0, 50)}</p>

                <h3>Price: ${item.price}</h3> 
                <h3>Quantity: ${item.quantity}</h3>
                <h3>Total: ${item.price * item.quantity}</h3>

                <button class="order" data-orders="${item.idOrder}">
                    Remove Order
                </button>
            </div>
        `
    })
}

// =============================
// Remove Order
// =============================

cards.addEventListener("click", (e) => {

    if (e.target.classList.contains("order")) {

        let id = Number(e.target.dataset.orders)

        Products = Products.filter((item) => {
            return !(Number(item.idOrder) === id && item.idcust === user.id)
        })

        localStorage.setItem("product", JSON.stringify(Products))

        getProduct()
    }
})