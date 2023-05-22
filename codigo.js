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

// ! SCRIPT DE LA SECCION DIVISOR
const carrusel__contenedor = document.querySelector(".carrusel__contenedor");

let carrusel__card = [];
carrusel__card = document.querySelectorAll(".carrusel__card");

let espaciadoTexto = carrusel__contenedor.dataset.espaciadoCards;

let cantidad = parseInt(carrusel__contenedor.dataset.cantidadPantalla); /**/
let espaciado;
let anchoCarrusel__card;
let anchoCarrusel__contenedor;
let residuo = carrusel__card.length % cantidad;

carrusel__contenedor.style.gap = espaciadoTexto; // Le asignamos el valor del atributo al estilo css
// * Vemos si es % o px */
if (espaciadoTexto.includes("%")) {
	let numero = espaciadoTexto.replace("%","/100");
	espaciado = eval(numero) * 100;
} else {
	espaciado = parseFloat(espaciadoTexto);
}


// * Asignarle el ancho a los cards
for(i=0; i<carrusel__card.length; i++) {
	carrusel__card[i].style.width = `calc( (100% - ${espaciado * (cantidad - 1)}px) / ${cantidad})`;
	//anchoCarrusel__card = carrusel__card[i].offsetWidth;
	//anchoCarrusel__card = (carrusel__card[i].offsetWidth / carrusel__card[i].parentElement.offsetWidth) * 100;
	anchoCarrusel__card = (carrusel__card[i].offsetWidth * 100) / window.innerWidth;
}

console.log(anchoCarrusel__card)
let bloques = Math.trunc(carrusel__card.length/cantidad);

// * Calcular el ancho del carrusel__contenedor
if (residuo == 0) {
	anchoCarrusel__contenedor = 100 * bloques;

	// * Asignarle el ancho al contendor
	carrusel__contenedor.style.width = `${anchoCarrusel__contenedor}%`;

} else {
	if (carrusel__card.length<cantidad) {
		bloques=1;
		residuo=0;
	}
	anchoCarrusel__contenedor = (100 * bloques) + (anchoCarrusel__card*residuo);

	// * Asignarle el ancho al contendor
	carrusel__contenedor.style.width = `calc(${anchoCarrusel__contenedor}% + ${(espaciado*(residuo))}px)`;
}




console.log(espaciado)



// ! SCRIPT DE LA SECCION FORMULARIO
const contenedor = document.querySelector(".contenedor");
let contenedor__card = [];
contenedor__card = document.querySelectorAll(".contenedor__card");

const exito = document.querySelector(".contenedor__exito");

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
const btnEnviar = document.querySelector(".formulario__enviar");
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
	if (slideActual == contenedor__card.length-1) {
		siguiente.style.display = "none";
		btnEnviar.style.display = "block";
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
		btnEnviar.style.display = "none";
	}

	// Desaparecer el boton anterior
	if (slideActual == 1) {
		anterior.style.opacity = "0";
	}
})

btnEnviar.addEventListener("click", ()=>{
	// Movemos el slide
	left-=anchoContenedor__card;
	slideActual++;
	contenedor.style.marginLeft = `${left}%`;
	modificarBarra();
	
	// Desaparecer lso botones 
	siguiente.style.display = "none";
	anterior.style.display = "none";
	btnEnviar.style.display = "none";
	exito.style.gap = "clamp(12px, 1.25vw, 20px)";
	enviar();
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
