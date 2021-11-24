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