document.addEventListener('DOMContentLoaded', () => {
    // Objeto array de carrito (sustitución de la API, no he sabido integrar la api)
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'iFhone 13 Pro',
            referencia: 'REF: 0K3QOSOV4V',
            precio: 938.99,
        },
        {
            id: 2,
            nombre: 'Cargador',
            referencia: 'REF: TGD5XORY1L',
            precio: 49.99,
        },
        {
            id: 3,
            nombre: 'Funda de piel',
            referencia: 'REF: TGD5XORY1L',
            precio: 79.99,

        },

    ];

    let carrito = [];
    const divisa = '€';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // Funciones

    
    // Dibuja todos los elementos a partir de la base de datos.
    
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Referencia
            const miNodoReferencia = document.createElement('p');
            miNodoReferencia.classList.add('card-text');
            miNodoReferencia.textContent = info.referencia;
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton añadir
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', agregarProductoAlCarrito);
            // Boton eliminar
            const miNodoBoton2 = document.createElement('button');
            miNodoBoton2.classList.add('btn', 'btn-primary');
            miNodoBoton2.textContent = '-';
            miNodoBoton2.setAttribute('marcador', info.id);
            miNodoBoton2.addEventListener('click', eliminarProductoDelCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoReferencia);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodoCardBody.appendChild(miNodoBoton2);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    
     //Función para añadir un producto al carrito de la compra
    
    function agregarProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();

    }
    // Función para eliminar un producto del carrito de la compra
    function eliminarProductoDelCarrito(evento) {
        const productoId = evento.target.getAttribute('marcador'); 
    
        // Encontrar el índice del producto en el carrito
        const indice = carrito.findIndex(producto => producto === productoId);
    
        if (indice !== -1) {
            // Eliminar el producto del carrito
            carrito.splice(indice, 1);
        }
    
        // Actualizar el carrito
        renderizarCarrito();
    }

    // Dibuja todos los productos guardados en el carrito
    
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
    
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                //Incremento del contador.
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
       // Renderizamos el precio total en el HTML
       DOMtotal.textContent = calcularTotal();
    }

    
    // Evento para borrar un elemento del carrito

    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID 
        const id = evento.target.dataset.item;
        // Borramos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
    }

    
      //Calcula el precio total teniendo en cuenta los productos repetidos
     
    function calcularTotal() {
        // Recorremos el array del carrito
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    // Varia el carrito y vuelve a dibujarlo
    
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
    }


    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    
    renderizarProductos();
    renderizarCarrito();
  });