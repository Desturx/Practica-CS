


function mensajeModal(key, nombre)
{
    let html,div;
    div = document.createElement('div');
    div.classList.add('modal');
    div.setAttribute("id","ventana");

    html =  '<div style="top: 15%" class="modal-dialog" role="document">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<h5>Descargar '+ nombre + '</h5>';
    html += '<button onclick="ventana.remove();" type="button" class="close" data-dismiss="modal" aria-label="Close">';
    html += '<span aria-hidden="true">&times;</span>';
    html += '</button>';
    html += '</div>';
    html += '<div style="text-align: center" class="modal-body">';
    html += '<a style="border-right-width: 1px;margin-right: 5%" href="/download-encrypted-object/'+key+'" class="btn btn-success">Encriptado</a>';
    html += '<a href="/download-decrypted-object/'+key+'" class="btn btn-success">Desencriptado</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    div.innerHTML = html;

    document.getElementById('inicio').appendChild(div);
    document.getElementById('ventana').style.display="block";

}

function falloSubirArchivo()
{
    let html,div;

    console.log("ha entrado");
    div = document.createElement('div');
    div.classList.add('modal');
    div.setAttribute("id","ventana");

    html =  '<div style="top: 15%" class="modal-dialog" role="document">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '<h5>No has seleccionado ningún archivo</h5>';
    html += '<button onclick="ventana.remove();" type="button" class="close" data-dismiss="modal" aria-label="Close">';
    html += '<span aria-hidden="true">&times;</span>';
    html += '</button>';
    html += '</div>';
    html += '<div style="text-align: center" class="modal-body">';
    html += '<p>Selecciona un archivo para subir haciendo click en la barrita de selección.</p>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    div.innerHTML = html;

    document.getElementById('inicio').appendChild(div);
    document.getElementById('ventana').style.display="block";

}

function errMensaje(pagina, mensaje) 
{
    document.getElementById(pagina).innerHTML = mensaje;
}

function cerrar()
{
	//para cerrar el mensaje modal. 
	document.querySelector('modal').remove();
}



function validatePass() {
    //comprueba si la longitud es 6 o mayor
    if(document.getElementById("pass").value.length >= 6){
        document.getElementById("caracteres").className = "icon-check";
        if(document.getElementById("bar1").className == "bar bar-1"){
            console.log(document.getElementById("bar1").className == "bar bar-1");
            document.getElementById("bar1").className = "bar2 bar-1";

        }
        else if(document.getElementById("bar1").className == "bar2 bar-1"){
            document.getElementById("bar2").className = "bar2 bar-2";
        }
        else if(document.getElementById("bar2").className == "bar2 bar-2"){
            document.getElementById("bar3").className = "bar2 bar-3";
        }
        else if(document.getElementById("bar3").className == "bar2 bar-3"){
            document.getElementById("bar4").className = "bar2 bar-4";
        }

    }
    else{
        document.getElementById("caracteres").className = "icon-cancel";
        if(document.getElementById("bar4").className == "bar2 bar-4"){
            document.getElementById("bar4").className == "bar bar-4";
        }
        else if(document.getElementById("bar3").className == "bar2 bar-3"){
            document.getElementById("bar3").className = "bar bar-3";
        }
        else if(document.getElementById("bar2").className == "bar2 bar-2"){
            document.getElementById("bar2").className = "bar bar-2";
        }
        else if(document.getElementById("bar1").className == "bar2 bar-1"){
            document.getElementById("bar1").className = "bar bar-1";
        }
    }


    //comprueba si hay mayus
    if(document.getElementById("pass").value.search(/[A-Z]/) > -1){
        document.getElementById("mayus").className = "icon-check";
        if(document.getElementById("bar1").className == "bar bar-1"){
            console.log(document.getElementById("bar1").className == "bar bar-1");
            document.getElementById("bar1").className = "bar2 bar-1";
        }
        else if(document.getElementById("bar1").className == "bar2 bar-1"){
            document.getElementById("bar2").className = "bar2 bar-2";
        }
        else if(document.getElementById("bar2").className == "bar2 bar-2"){
            document.getElementById("bar3").className = "bar2 bar-3";
        }
        else if(document.getElementById("bar3").className == "bar2 bar-3"){
            document.getElementById("bar4").className = "bar2 bar-4";
        }
    }
    else{
        document.getElementById("mayus").className = "icon-cancel";
        document.getElementById("caracteres").className = "icon-cancel";
        if(document.getElementById("bar4").className == "bar2 bar-4"){
            document.getElementById("bar4").className == "bar bar-4";
        }
        else if(document.getElementById("bar3").className == "bar2 bar-3"){
            document.getElementById("bar3").className = "bar bar-3";
        }
        else if(document.getElementById("bar2").className == "bar2 bar-2"){
            document.getElementById("bar2").className = "bar bar-2";
        }
        else if(document.getElementById("bar1").className == "bar2 bar-1"){
            document.getElementById("bar1").className = "bar bar-1";
        }
    }

    //comprueba si contiene algun numero
    if(document.getElementById("pass").value.search(/[0-9]/) > -1){
        document.getElementById("num").className = "icon-check";
        if(document.getElementById("bar1").className == "bar bar-1"){
            console.log(document.getElementById("bar1").className == "bar bar-1");
            document.getElementById("bar1").className = "bar2 bar-1";
        }
        else if(document.getElementById("bar1").className == "bar2 bar-1"){
            document.getElementById("bar2").className = "bar2 bar-2";
        }
        else if(document.getElementById("bar2").className == "bar2 bar-2"){
            document.getElementById("bar3").className = "bar2 bar-3";
        }
        else if(document.getElementById("bar3").className == "bar2 bar-3"){
            document.getElementById("bar4").className = "bar2 bar-4";
        }
    }
    else{
        document.getElementById("num").className = "icon-cancel";
        if(document.getElementById("bar4").className == "bar2 bar-4"){
            document.getElementById("bar4").className == "bar bar-4";
        }
        else if(document.getElementById("bar3").className == "bar2 bar-3"){
            document.getElementById("bar3").className = "bar bar-3";
        }
        else if(document.getElementById("bar2").className == "bar2 bar-2"){
            document.getElementById("bar2").className = "bar bar-2";
        }
        else if(document.getElementById("bar1").className == "bar2 bar-1"){
            document.getElementById("bar1").className = "bar bar-1";
        }
    }

    //comprueba si tiene caracter especial
    if(document.getElementById("pass").value.search(/[.$&+,:;=?@#_]/) > -1){
        document.getElementById("especial").className = "icon-check";
        if(document.getElementById("bar1").className == "bar bar-1"){
            console.log(document.getElementById("bar1").className == "bar bar-1");
            document.getElementById("bar1").className = "bar2 bar-1";
        }
        else if(document.getElementById("bar1").className == "bar2 bar-1"){
            document.getElementById("bar2").className = "bar2 bar-2";
        }
        else if(document.getElementById("bar2").className == "bar2 bar-2"){
            document.getElementById("bar3").className = "bar2 bar-3";
        }
        else if(document.getElementById("bar3").className == "bar2 bar-3"){
            document.getElementById("bar4").className = "bar2 bar-4";
        }
    }
    else{
        document.getElementById("especial").className = "icon-cancel";
        if(document.getElementById("bar4").className == "bar2 bar-4"){
            document.getElementById("bar4").className == "bar bar-4";
        }
        else if(document.getElementById("bar3").className == "bar2 bar-3"){
            document.getElementById("bar3").className = "bar bar-3";
        }
        else if(document.getElementById("bar2").className == "bar2 bar-2"){
            document.getElementById("bar2").className = "bar bar-2";
        }
        else if(document.getElementById("bar1").className == "bar2 bar-1"){
            document.getElementById("bar1").className = "bar bar-1";
        }
    }

   


}
