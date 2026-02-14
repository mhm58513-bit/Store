//pade orders
// get logged in

let Alog = document.getElementById("Alog")
let cards = document.querySelector(".items")

let Order = JSON.parse(localStorage.getItem("Order") || "[]")

let user = JSON.parse(localStorage.getItem("session"))

function User() {

    if (user) {
        Alog.innerHTML = "Hi " + user.name
        Alog.href = "./Login/profile.html"
    } else {
        Alog.innerHTML = "Login"
        Alog.href = "./Login.html"
        localStorage.removeItem("Order")
    }
}

User()


// Get orders

let Products = JSON.parse(localStorage.getItem("product") || "[}")

function getProduct() {

    let orderuser = Products.filter((Product) => {
        return Product.idcust === user.id
    })

    Order.push(...orderuser)

    localStorage.setItem("Order", JSON.stringify(Order))
}

getProduct()

// Create Display UI

function DisplayUI(Order) {

    cards.innerHTML = ""

    Order.forEach((item) => {
        cards.innerHTML += `
            <div class="card">
                <img src="${item.img}" alt="${item.title}" />
                <h2>${item.title.substring(0, 20)}</h2>
                <p>${item.des.substring(0, 50)}</p>
                <h3>${item.price}</h3> 
                <button class="order" data-orders="${item.idOrder}">Remove Order</button>
            </div>
            `
    })
}

DisplayUI(Order)


// Remove order

cards.addEventListener("click", (e) => {

    if (e.target.classList.contains("order")) {
        console.log("dfddsafaf")
        let IDorder = JSON.parse(localStorage.getItem("Order"))
        let Products = JSON.parse(localStorage.getItem("product"))

        let OrdersRemoved = IDorder.filter((OrderRemoved) => {
            return Number(OrderRemoved.idOrder) !== Number(e.target.dataset.orders) 
        })

        console.log(OrdersRemoved)
        DisplayUI(OrdersRemoved)
        localStorage.setItem("Order", JSON.stringify(OrdersRemoved))
        localStorage.setItem("product", JSON.stringify(OrdersRemoved))


    }

})
