const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");


const displayCart = () => {
modalContainer.innerHTML = "";
modalContainer.style.display = "block";
modalOverlay.style.display = "block";

    //modal Heater
    const modalHeater = document.createElement("div"),

    const modalClose = document.createElement("div");
    modalClose.innerText = "❌"
    modalClose.className = "modal-close";
    modalHeater.append(modalClose);

    modalClose.addEventListener("click", ()=>{
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    })

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Cart";
    modalTitle.className = "modal-title";
    modalHeater.append(modalTitle);

    modalContainer.append(modalHeater);
};

cartBtn.addEventListener("click", displayCart);

