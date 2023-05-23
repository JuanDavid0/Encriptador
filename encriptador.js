const letras = ['a', 'e', 'i', 'o', 'u'];
const llaves = ['ai', 'enter', 'imes', 'ober', 'ufat'];

const btnEncriptar = document.getElementById("btn-encriptar");
const btnDesencriptar = document.getElementById("btn-desencriptar");
const msjEntrada = document.getElementById("mensaje-entrada");
const msjSalidaVacia = document.getElementsByClassName("mensaje-salida-vacia")[0];
const msjSalida = document.getElementsByClassName("mensaje-salida")[0];
const msjSalidaTexto = document.getElementById("mensaje-salida-texto");
const btnCopiar = document.getElementsByClassName("btn-copiar")[0];
const btnCopiarTexto = document.getElementById("btn-copiar");

function mostrarMensaje(event) {
    const mensaje = msjEntrada.value;
    const btn = event.target;
    if (mensaje !== "") {
        msjSalidaVacia.style.display = "none";
        msjSalida.style.display = "flex";
        btnCopiar.style.display = "flex";
        if (btn === btnEncriptar) {
            msjSalidaTexto.innerHTML = encriptar(mensaje);
        } else if (btn === btnDesencriptar) {
            msjSalidaTexto.innerHTML = desencriptar(mensaje);
        }
        msjEntrada.value = "";
    } else {
        msjSalidaVacia.style.display = "flex";
        msjSalida.style.display = "none";
    }
}

function copiarTexto() {
    const texto = msjSalidaTexto.textContent;
    navigator.clipboard.writeText(texto)
        .then(function() {
            window.getSelection().selectAllChildren(msjSalidaTexto);
        })
        .catch(function(error) {
            console.error("Error al copiar el texto: ", error);
        });
}

function encriptar(texto) {
    texto = texto.toLowerCase();
    let textoEncriptado = "";
    for (let i = 0; i < texto.length; i++) {
        if (letras.includes(texto[i])) {
            textoEncriptado += llaves[letras.indexOf(texto[i])];
        } else {
            textoEncriptado += texto[i];
        }
    }
    return textoEncriptado;
}

function desencriptar(texto) {
    texto = texto.toLowerCase();
    let textoDesencriptado = "";
    var sizeLlave = 0;
    var i = 0;
    while (i < texto.length) {
        if (letras.find(letra => letra === texto[i])) {
            sizeLlave = (llaves[letras.indexOf(texto[i])].length);
            if (compararCadenas(texto.slice(i, (i + sizeLlave)), llaves[letras.indexOf(texto[i])])) {
                textoDesencriptado += letras[letras.indexOf(texto[i])];
                i += sizeLlave;
            } else {
                textoDesencriptado += texto[i];
                i++;
            }
        } else {
            textoDesencriptado += texto[i];
            i++;
        }
    }
    return textoDesencriptado;
}

function compararCadenas(cadena1, cadena2) {

    if (cadena1.length !== cadena2.length) {
        return false;
    } else {
        for (let i = 0; i < cadena1.length; i++) {
            if (cadena1[i] !== cadena2[i]) {
                return false;
            }
        }
    }
    return true;
}

msjSalida.style.display = "none";
btnCopiar.style.display = "none";

btnEncriptar.addEventListener("click", mostrarMensaje);
btnDesencriptar.addEventListener("click", mostrarMensaje);
btnCopiarTexto.addEventListener("click", copiarTexto);