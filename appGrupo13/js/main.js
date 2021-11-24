//Funcion para eliminar videojuegos de la API
function deleteVideojuego(){
	var idVideojuego = document.getElementById("deleteid").value;
	if(idVideojuego <=0){
		alert("Id ingresado no es valido");
	}else{
		var deleteresult;
		fetch("http://127.0.0.1:3000/videojuegos/"+idVideojuego, {method:"DELETE"})
		.then(response => response.json()).then(data => deleteresult=data);
		deleteresult;
		alert("Se elimino el videojuego con ID #"+idVideojuego);
		location.reload();
	}
}

//Funcion para agregar videojuegos a la API
function addVideojuego(){
	var videojuegoadd={titulo:document.getElementById("titulo").value,
	autor:document.getElementById("autor").value,	
	imagen:document.getElementById("imagen").value,
	categoria:document.getElementById("categoria").value,
	descripcion:document.getElementById("descripcion").value}

	var addresult;
	fetch("http://127.0.0.1:3000/videojuegos",
	{
		method:"POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(videojuegoadd),
	})
	.then(response=>response.json())
	.then(data=>addresult=data);
	addresult;
	location.reload();
}