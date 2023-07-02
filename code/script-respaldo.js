/* CODIGO PARA QUE SE CAMBIE EL FONDO */

var enlacesAgregados = [];
var imagenesAgregadas = [];



/* EXTRAER DATOS DEL HTML AL JS POR MEDIO DE ID */
let querty = document.querySelector('.query')
let buscar = document.querySelector('.buscar');


/* FUNCIONAMIENTO AL DAR EL BOTON DE ENTER Y HACER LA BUSQUEDA */

querty.addEventListener('keypress', (e) => {
    if (e.which == 13) {

        let url = 'https://www.google.com/search?q=' + querty.value;
        window.open(url, '_blank');
    }

})



/* HACER VALIDO SI EL TEXTO ESTA VACIO PARA DARLE UN AVISO */

function validateInput(input) {
    if (input.trim() === '') {

        return false;
    }
    return true;

}





/* HACER CLICK EL BOTON DE INICIAR BUSQUEDA Y PONER LA ALERTA DE LA COMPROVACION DEL INPIT VACIO */

document.getElementById("search").addEventListener("click", vacio)

function vacio(event) {
    event.preventDefault();

    const input = document.getElementById('input2').value;

    if (validateInput(input)) {

        let url = 'https://www.google.com/search?q=' + querty.value;
        window.open(url, '_blank');

    } else {

        swal({
            title: "Aviso",
            text: "Por favor, complete el campo antes de realizar la búsqueda. Un campo vacío no nos permitirá proporcionarle los resultados que está buscando.",
            icon: "warning",
            button: "Continuar"
        })
    }
}





// Verificar si hay imágenes almacenadas en el localStorage
if (localStorage.getItem('imagenesAgregadas')) {
    imagenesAgregadas = JSON.parse(localStorage.getItem('imagenesAgregadas'));
}

const input = document.getElementById('input');

input.addEventListener("change", () => {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const image = new Image();
        image.onload = function () {
            document.body.style.backgroundImage = `url('${e.target.result}')`;
        };
        image.src = e.target.result;
    };

    reader.readAsDataURL(file);
});





const alerta = document.getElementById('alerta');

/* BOTON PARA AGREGAR MAS IMAGENES */
// Obtener referencias a los elementos de entrada y texto
var paginaURLInput = document.getElementById('paginaURL');
var imagenURLInput = document.getElementById('imagenURL');
var txt = document.getElementById('textoURL');
var gridContainer = document.querySelector('.grid-container');

// Agregar eventos de escucha de teclado
paginaURLInput.addEventListener('keyup', cambiarColorFondo);
imagenURLInput.addEventListener('keyup', cambiarColorFondo);



// Función para cambiar el color de fondo y texto
function cambiarColorFondo() {
    var paginaURL = paginaURLInput.value;
    var imagenURL = imagenURLInput.value;

    // Verificar si hay al menos un carácter en los campos de entrada
    var paginaURLValida = paginaURL.trim() !== "";
    var imagenURLValida = imagenURL.trim() !== "";

    // Cambiar el color de fondo en consecuencia
    paginaURLInput.style.background = paginaURLValida ? "#fff" : "#f02d2d";
    imagenURLInput.style.background = imagenURLValida ? "#fff" : "#f02d2d";

    // Cambiar el texto según el estado del campo de entrada
    if (paginaURLValida || imagenURLValida) {
        txt.innerText = "Ingrese la URL de la página y la URL de la imagen:";
    } else {
        txt.innerText = "Debe ingresar una URL válida para la página y la imagen.";
    }
}








function ponerImagenConEnlace() {
    var paginaURL = document.getElementById('paginaURL').value;
    var imagenURL = document.getElementById('imagenURL').value;

    // Verificar si ya existe un enlace con la misma URL
    var enlaces = document.querySelectorAll('.grid-container a');
    var enlaceDuplicado = false;
    enlaces.forEach(function (enlace) {
        if (enlace.href === paginaURL) {
            enlaceDuplicado = true;
            return;
        }
    });

    if (enlaceDuplicado) {
        txt.innerText = "El enlace ya está agregado, favor de cambiarlo.";
        return;
    }

    // Verificar si ya existe una imagen con la misma URL
    var imagenes = document.querySelectorAll('.grid-container img');
    var imagenDuplicada = false;
    imagenes.forEach(function (imagen) {
        if (imagen.src === imagenURL) {
            imagenDuplicada = true;
            return;
        }
    });

    if (imagenDuplicada) {
        txt.innerText = "El enlace de la imagen ya está agregado, favor de cambiarlo.";
        return;
    }

    // Verificar si la URL comienza con "https://"
    var urlRegex = /^https:\/\//i;
    if (!urlRegex.test(paginaURL) || !urlRegex.test(imagenURL)) {
        txt.innerText = "Debe ingresar una URL válida para la página y la imagen (que comience con 'https://').";
        document.getElementById('paginaURL').style.background = "#f02d2d";
        document.getElementById('imagenURL').style.background = "#f02d2d";
        return;
    }

    // Verificar si la URL es un enlace válido
    var linkValido = validarEnlace(paginaURL);
    if (!linkValido) {
        txt.innerText = "El enlace de la página no es válido, favor de verificarlo.";
        document.getElementById('paginaURL').style.background = "#f02d2d";
        return;
    }

    if (paginaURL && imagenURL) {
        txt.innerText = "Ingrese la URL de la página y la URL de la imagen:";
        var gridContainer = document.querySelector('.grid-container');
        var newLink = document.createElement('a');
        newLink.href = paginaURL;
        newLink.target = "_blank";
        var newImage = document.createElement('img');
        newImage.src = imagenURL;
        newImage.alt = "Nueva Imagen";
        newLink.appendChild(newImage);
        gridContainer.appendChild(newLink);

        enlacesAgregados.push(paginaURL);

        // Reiniciar los campos de entrada
        document.getElementById('paginaURL').value = '';
        document.getElementById('imagenURL').value = '';

        // Ocultar la alerta
        document.getElementById('alerta').style.display = 'none';

        // Mostrar el botón "OK" si hay elementos eliminados previamente
        if (document.querySelectorAll('.borrado').length > 0) {
            document.getElementById('okBtn').style.display = 'block';
        }
    } else {
        txt.innerText = "Debe ingresar una URL válida para la página y la imagen.";
        document.getElementById('paginaURL').style.background = "#f02d2d";
        document.getElementById('imagenURL').style.background = "#f02d2d";
    }
}

async function validarEnlace(url) {
    try {
        const response = await fetch(url);
        return response.ok;
    } catch (error) {
        console.error('Error al validar el enlace:', error);
        return false;
    }
}









// Obtener las imágenes existentes en el div "grid-container"
var imagenesExistentes = gridContainer.querySelectorAll('img');
var imagenesAgregadas = [];

// Agregar las imágenes existentes al array "imagenesAgregadas"
imagenesExistentes.forEach(function (imagen) {
    imagenesAgregadas.push(imagen.src);
});



function editar() {
    document.getElementById('alerta2').style.display = "block";
    document.getElementById('alerta').style.display = 'none';

    var imagenesContainer = document.getElementById('imagenesAgregadas');
    imagenesContainer.innerHTML = ""; // Limpiar el contenido actual

    var gridContainer = document.querySelector('.grid-container');
    var enlaces = gridContainer.querySelectorAll('a');

    var filaActual = document.createElement('div'); // Nueva fila
    filaActual.classList.add('fila-imagenes');

    var contador = 0; // Contador para controlar las imágenes por fila

    enlaces.forEach(function (enlace) {
        var imagen = enlace.querySelector('img');
        var imagenURL = imagen.src;
        var paginaURL = enlace.href;

        var imagenElement = document.createElement('div');
        imagenElement.classList.add('imagen-agregada');
        imagenElement.innerHTML = '<img src="' + imagenURL + '" alt="Imagen Agregada"><button onclick="borrarImagen(this)">Borrar</button>';

        filaActual.appendChild(imagenElement); // Agregar imagen a la fila actual
        contador++;

        if (contador === 4) {
            imagenesContainer.appendChild(filaActual); // Agregar fila actual al contenedor de imágenes
            filaActual = document.createElement('div'); // Crear nueva fila
            filaActual.classList.add('fila-imagenes');
            contador = 0; // Reiniciar el contador
        }
    });

    if (contador > 0) {
        imagenesContainer.appendChild(filaActual); // Agregar la última fila al contenedor de imágenes
    }
}


function agregar() {
    document.getElementById('alerta').style.display = 'block';
}

function cancelar() {
    document.getElementById('alerta').style.display = 'none';
}







function borrarImagen(boton) {
    var imagenElement = boton.parentNode;
    imagenElement.parentNode.removeChild(imagenElement);

    // Obtener el índice de la imagen en el array "imagenesAgregadas"
    var index = Array.from(imagenElement.parentNode.children).indexOf(imagenElement);

    if (index > -1) {
        imagenesAgregadas.splice(index, 1);
    }

    if (imagenesAgregadas.length === 0) {
        document.getElementById('okBtn').style.display = 'block';
    }
}

function cancelar2() {
    document.getElementById('alerta2').style.display = 'none';
}








function mostarLosCambios() {
    // Ocultar la segunda alerta
    document.getElementById('alerta2').style.display = 'none';

    // Obtener las imágenes actualizadas del div "imagenesAgregadas"
    var imagenesActualizadas = document.querySelectorAll('#imagenesAgregadas img');

    // Obtener los enlaces existentes en el div "grid-container"
    var enlacesExistentes = document.querySelectorAll('.grid-container a');

    // Crear un conjunto de rutas de imágenes actualizadas
    var rutasActualizadas = Array.from(imagenesActualizadas).map(function (imagen) {
        return imagen.src;
    });

    // Eliminar los enlaces que corresponden a las imágenes que ya no están presentes
    enlacesExistentes.forEach(function (enlace) {
        var imagenEnlace = enlace.querySelector('img');
        var rutaImagen = imagenEnlace.src;
        if (!rutasActualizadas.includes(rutaImagen)) {
            enlace.parentNode.removeChild(enlace);
        }
    });

    // Actualizar el array "imagenesAgregadas" con las imágenes actualizadas
    imagenesAgregadas = Array.from(imagenesActualizadas).map(function (imagen) {
        return imagen.src;
    });

    // Guardar los cambios en el localStorage
    localStorage.setItem('imagenesAgregadas', JSON.stringify(imagenesAgregadas));

    // Mostrar el botón "OK" nuevamente si hay elementos eliminados previamente
    if (document.querySelectorAll('.borrado').length > 0) {
        document.getElementById('okBtn').style.display = 'block';
    }
}
