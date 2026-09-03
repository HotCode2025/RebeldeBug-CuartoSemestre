const shopContent = document.getElementById("shopContent");
const cart = []; //Este es el carrito, array vacio

//Correccion para el formato del precio, se traslada a moneda Arg, por lo que los decimales son necesarios
const formatoPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0
});

productos.forEach((product) =>{
    const content = document.createElement("div");
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.productName}<h3>
    <p>${formatoPrecio.format(product.price)}</p>
    `;
    //Se coloca el ajuste para el valor en <p>
    
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    content.append(buyButton);

    buyButton.addEventListener("click", ()=>{
       const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

       if (repeat){
        cart.map((prod)=> {
            if (prod.id === product.id) {
                prod.quanty++;
            }
        });

       }else {
        cart.push({
            id: product.id,
            productName: product.productName,
            price: product.price,
            quanty: 1,
            img: product.img,
        });
       }
    });
});
