let Alog = document.getElementById("Alog")
let cards = document.querySelector(".items")

cards.innerHTML = ""
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


function getProduct() {
    let Products = JSON.parse(localStorage.getItem("product"))
    //let Order = JSON.parse(localStorage.getItem("Order") || "[]")
    let Order = []
    let orderuser = Products.filter((Product) => {
        return Product.idcust === user.id
    })



   

    Order.push(...orderuser)
    localStorage.setItem("Order", JSON.stringify(Order))
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
getProduct()



let RemoveOrder = document.querySelectorAll(".order")

function remove(){
    RemoveOrder.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        e.preventDefault
        let IDorder = localStorage.getItem("Order")
        localStorage.removeItem("btn.dataset.orders")
    })
})
}

remove()
