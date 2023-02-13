

/* EXTRAER DATOS DEL HTML AL JS POR MEDIO DE ID */
let querty = document.querySelector('.query')
let buscar = document.querySelector('.buscar');

        /* FUNCIONAMIENTO AL DAR EL BOTON DE ENTER Y HACER LA BUSQUEDA */

    querty.addEventListener('keypress', (e) => {
        if (e.which == 13  ) {
  
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

   function vacio(event){
        event.preventDefault();

        const input = document.getElementById('input').value;

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






/* AGREGAR DOS BOTONES A LA ALERTA */
           /*   swal({
                title: "Aviso",
                text: "No has escrito nada. Favor de poner algo para iniciar la búsqueda",
                icon: "warning",
                showCancelButton: true,
                buttons:{
                    confirm:{
                        text: "Aceptar",
                        value: true,
                        visible: true,
                        classNaME: "button1",
                        classModal: true
                    },
                    customButton: {
                        text: "Cancelar",
                        value: false,
                        visible: true,
                        className: "button2",
                        closeModal: true
                      }
                }
              }).then((value) => {
                    if(value){
                        alert("Gracias por comprender. ")
                    }else{
                        alert("Aun no has llenado los datos. Ir a llenarlos")
                    }
              }); */
              






