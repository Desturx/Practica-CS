


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

function modalError(titulo, desc) 
{
    let html,div;
        div = document.createElement('div');
        div.classList.add('modal');
        div.setAttribute("id","ventana");
    
        html =  '<div style="top: 15%" class="modal-dialog" role="document">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header" >';
        html += '<h5>'+ titulo + '</h5>';
        html += '<button onclick="ventana.remove();" type="button" class="close" data-dismiss="modal" aria-label="Close">';
        html += '<span aria-hidden="true">&times;</span>';
        html += '</button>';
        html += '</div>';
        html += '<div style="text-align: center" class="modal-body">';
        html += '<p>' + desc + '</p>'
        html += '</div>';
        html += '</div>';
        html += '</div>';
        
        div.innerHTML = html;
    
        document.getElementById('inicio').appendChild(div);
        document.getElementById('ventana').style.display="block";
}

function cerrar()
{
	//para cerrar el mensaje modal. 
	document.querySelector('modal').remove();
}
