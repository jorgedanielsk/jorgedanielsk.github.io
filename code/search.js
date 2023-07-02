/* EXTRAER DATOS DEL HTML AL JS POR MEDIO DE ID */
let query = document.querySelector('.query');
let buscar = document.querySelector('.buscar');

/* FUNCIONAMIENTO AL DAR EL BOTON DE ENTER Y HACER LA BUSQUEDA */
query.addEventListener('keypress', (e) => {
    if (e.which == 13) {
        let url = 'https://www.google.com/search?q=' + query.value;
        window.open(url, '_blank');
    }
});

/* HACER VALIDO SI EL TEXTO ESTA VACIO PARA DARLE UN AVISO */
function validateInput(input) {
    if (input.trim() === '') {
        return false;
    }
    return true;
}

/* HACER CLICK EL BOTON DE INICIAR BUSQUEDA Y PONER LA ALERTA DE LA COMPROVACION DEL INPUT VACIO */
document.getElementById('search').addEventListener('click', vacio);

function vacio(event) {
    event.preventDefault();

    const input = document.getElementById('input2').value;

    if (validateInput(input)) {
        let url = 'https://www.google.com/search?q=' + input;
        window.open(url, '_blank');
    } else {
        swal({
            title: 'Aviso',
            text: 'Por favor, complete el campo antes de realizar la búsqueda. Un campo vacío no nos permitirá proporcionarle los resultados que está buscando.',
            icon: 'warning',
            button: 'Continuar'
        });
    }
}






/* CODIGO PARA CAMBIAR EL FONDO DE LA PAGINA */
const backgroundImg = document.getElementById('backgroundImg');

backgroundImg.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", () => {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                document.body.style.backgroundImage = `url('${e.target.result}')`;
                // Guardar la URL de la imagen en el almacenamiento local
                localStorage.setItem("backgroundImage", e.target.result);
            };
            image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    });

    input.click();
});

// Verificar si hay una URL de imagen almacenada en el almacenamiento local
const storedImage = localStorage.getItem("backgroundImage");
if (storedImage) {
    document.body.style.backgroundImage = `url('${storedImage}')`;
}





/* CODIGO PARA APARECER EL MENU CON LAS APLICACIONES */

function toggleMenu() {
    var menuLinks = document.querySelectorAll(".menu2 a");
    for (var i = 0; i < menuLinks.length; i++) {
        if (menuLinks[i].style.display === "none") {
            menuLinks[i].style.display = "block";
        } else {
            menuLinks[i].style.display = "none";
        }
    }
}
