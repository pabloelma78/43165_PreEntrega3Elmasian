let articulosCarrito = [];
const listaProductos = document.querySelector('#productos');
console.log(listaProductos);
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
console.log(contenedorCarrito);

document.addEventListener('DOMContentLoaded', ()=>{
    if(JSON.parse(localStorage.getItem('carrito')) == null){
        articulosCarrito = []
        //console.log(articulosCarrito)
    }else {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'))
        //console.log(articulosCarrito)
    }
    carritoHTML();
})

listaProductos.addEventListener('click', agregarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
carrito.addEventListener('click', eliminarProducto)

function agregarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('agregarCarrito')){
        const producto = evt.target.parentElement.parentElement;
        //console.log(producto)
        leerDatosProducto(producto)
        
    }
}

function eliminarProducto(evt){
    evt.preventDefault();
    //console.log(evt.target.parentElement)
    if(evt.target.classList.contains('borrar-producto')){
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector('a').getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}

function leerDatosProducto(item){
    const infoProducto = {
        imagen: item.querySelector('img').src,
        titulo: item.querySelector('h5').textContent,
        precio: item.querySelector('.valor').textContent,
        id: item.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    if(articulosCarrito.some( item => item.id === infoProducto.id)){ 
        
        const productos = articulosCarrito.map( producto => {
            if(producto.id === infoProducto.id){
                let cantidad = parseInt(producto.cantidad);
                cantidad +=1;
                producto.cantidad = cantidad;
                return producto;
            }else {
                return producto
            }
        })
        articulosCarrito = productos.slice();
    }else {
        articulosCarrito.push(infoProducto)
    }

    
    carritoHTML()
}

function carritoHTML(){
    limpiarCarrito();
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.imagen}"  width="100"/></td>
            <td>${producto.titulo}</td>
             <td>${producto.precio}</td>
             <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}"> ❌ </a>
            </td>
        `;
        contenedorCarrito.appendChild(fila)
    })

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function vaciarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    articulosCarrito = [];
    sincronizarStorage();
}
