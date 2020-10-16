function mensajeModal(key){
    let html,div;

    console.log("ha entrado");
    div = document.createElement('div');
    div.classList.add('modal');
    div.setAttribute("id","ventana");

    html =  '<div style="top: 15%" class="modal-dialog" role="document">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
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


function cerrar(){
	//para cerrar el mensaje modal. 
	document.querySelector('modal').remove();
}
