function mensajeModal(key){
    let html,div;

    console.log("ha entrado");
    div = document.createElement('div');
	div.classList.add('modal');

    html = '<div class="modal-contenido">';
    html += '<a href="#">X</a>';
    html += '<div>';
    html += '<a href="/download-encrypted-object/'+key+'" class="btn btn-success">Encriptado</a>';
    html += '<a href="/download-decrypted-object/'+key+'" class="btn btn-success">Desencriptado</a>';
    html += '</div>';
    html += '</div>';

    div.innerHTML = html;
    document.body.appendChild(div);

}