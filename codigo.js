// ! Cosas que no sabia
/*
- obtener el ancho del contenedor
contenedor.style.width → devolverá una cadena vacía.
x = | window.getComputedStyle(contenedor).width → ancho pero concatenado con px (independientemente de si se establece en línea o en una hoja de estilo CSS)
x.getPropertyValue('width')

-Sin embargo, hay formas alternativas de lograr comportamientos personalizados utilizando atributos personalizados conocidos como atributos de datos (data attributes). Los atributos de datos te permiten almacenar información personalizada en los elementos HTML utilizando el prefijo "data-" seguido de un nombre de atributo que elijas.
[data-mi-atributo="valor"] {
  color: red;
  font-size: 20px;
}
elemento = document.getElementById('mi-elemento');
elemento.dataset.miAtributo = 'nuevo valor';
*/

// ! SCRIPT DE LA SECCION PANTALLA DE CARGA
window.onload = function(){
	const carga = document.querySelector(".carga");
	document.body.removeChild(carga);
}


// ! SCRIPT DE LA SECCION HEADER RESPONSIVE
const headerRes__nav = document.querySelector(".headerRes__nav");
function abrirMenu() {
	headerRes__nav.style.transform = "translateY(0)";
}
function cerrarMenu() {
	headerRes__nav.style.transform = "translateY(-100%)";
}





// ! SCRIPT DE LA SECCION DIVISOR
carrusel__card = [];
carrusel__card = document.querySelectorAll(".carrusel__card");

carrusel__contenedor = document.querySelector(".carrusel__contenedor");

let marginActual = 0;
let marginActual2 = 0;

// * Desptok
function moverDerecha() {
	marginActual -= 100/6;
    carrusel__contenedor.style.marginLeft = `${marginActual}%`;

    carrusel__contenedor.style.transition = "1s ease all";
    
    setTimeout(()=>{
        let clon = carrusel__contenedor.children[0].cloneNode(true);
        let aux;
        for (i=carrusel__contenedor.children.length-1; i>=0; i--) {
            aux = carrusel__contenedor.children[i].cloneNode(true);
            carrusel__contenedor.replaceChild(clon,carrusel__contenedor.children[i]);
            clon = aux.cloneNode(true);
        }
		marginActual += 100/6;
        carrusel__contenedor.style.marginLeft = `${marginActual}%`;
        carrusel__contenedor.style.transition = "none";
        
    }, 1000);

    
}

// * Mobile
function moverDerecha2() {
	marginActual -= 25;
    carrusel__contenedor.style.marginLeft = `${marginActual}%`;

    carrusel__contenedor.style.transition = "1s ease all";
    
    setTimeout(()=>{
        let clon = carrusel__contenedor.children[0].cloneNode(true);
        let aux;
        for (i=carrusel__contenedor.children.length-1; i>=0; i--) {
            aux = carrusel__contenedor.children[i].cloneNode(true);
            carrusel__contenedor.replaceChild(clon,carrusel__contenedor.children[i]);
            clon = aux.cloneNode(true);
        }
		marginActual += 25;
        carrusel__contenedor.style.marginLeft = `${marginActual}%`;
        carrusel__contenedor.style.transition = "none";
        
    }, 1000);

    
}

setInterval( ()=>{
	if (document.body.clientWidth > 800 ) {
    	moverDerecha();
	} else {
		moverDerecha2();
	}
}, 4000)



// ! SCRIPT DE LA SECCION FORMULARIO
const contenedor = document.querySelector(".contenedor");
let contenedor__card = [];
contenedor__card = document.querySelectorAll(".contenedor__card");

// * Hacer el ancho del contendor y de las card dinámicas
let anchoContenedor = contenedor__card.length*100;
contenedor.style.width = `${anchoContenedor}%`;

let anchoContenedor__card = anchoContenedor/contenedor__card.length;
for (i=0; i<contenedor__card.length; i++) {
	contenedor__card[i].style.width = `${anchoContenedor__card}%`;
}

// * Funcionalidad de los botones, derecha e izquierda y enviar
const anterior = document.querySelector(".formulario__controles-contenedorI");
const siguiente = document.querySelector(".formulario__controles-contenedorD");
let left = 0;
let slideActual = 1;

siguiente.addEventListener("click", ()=>{
	// Voltear a la derecha
	if (slideActual+1 <= contenedor__card.length) { 
		left-=anchoContenedor__card;
		slideActual++;
		contenedor.style.marginLeft = `${left}%`;
		modificarBarra();

		//Restablecer valores (hacer que aparezcan)
		anterior.style.opacity = "1";
	}

	// Aparecer el boton enviar
	if (slideActual == contenedor__card.length) {
		siguiente.style.display = "none";

		// Desaparecer lso botones 
		siguiente.style.display = "none";
		anterior.style.display = "none";
		enviar();
	}


})

anterior.addEventListener("click", ()=>{
	// Voltear a la izquierda
	if (slideActual-1 >= 1) { 
		left+=anchoContenedor__card;
		slideActual--;
		contenedor.style.marginLeft = `${left}%`;
		modificarBarra();

		//Restablecer valores (hacer que aparezcan)
		siguiente.style.opacity = "1";
		siguiente.style.cursor = "pointer";

		siguiente.style.display = "block";
	}

	// Desaparecer el boton anterior
	if (slideActual == 1) {
		anterior.style.opacity = "0";
	}
})



// * Funcionalidad de la barra de progreso
const formulario__barra = document.querySelector(".formulario__barra");
const formulario__slider = document.querySelector(".formulario__slider");

let tamano = 100.0/(contenedor__card.length-1);

function modificarBarra() {
	let anchoBarra = tamano * (slideActual-1);
	formulario__barra.style.width = `${anchoBarra}%`;
}


// * Enviar el mensaje con su nombre
const mensaje = document.querySelector(".contenedor__exito-texto");

function enviar() {
	let nombre = document.getElementById("nombre").value;

	if (nombre == "") {
		nombre = "Usuario";
	}
	mensaje.innerHTML = `Gracias, ${nombre}.<br>Nos contactaremos contigo pronto`;

}


// * Abrir el formulario
const formulario = document.querySelector(".formulario");
function abrir() {
	formulario.style.display = "flex";
	setTimeout(()=>{
		formulario__slider.style.transform = "translateY(0vh)";
	}, 100);
}

function cerrar() {
	formulario__slider.style.transform = "translateY(-75vh)";
	setTimeout(()=>{
		formulario.style.display = "none";
	}, 1500);
}
