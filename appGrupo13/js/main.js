var fila="<tr><td class='id'></td><td class='imagen'></td><td class='titulo'></td><td class='autor'></td><td class='categoria'></td><td class='descripcion'></td><td class='action'></td></tr>";



function crearBoton(id){
	var boton="<button class='btn btn-danger' onclick='deleteVideojuego("+id+");'>Borrar</button>";
	return boton;
}

function crearBotonModificar(id){
	var boton="<input type='button' class='btn btn-primary' value='Editar' onclick='actualizarVideojuego("+id+")'/>"
	//var boton="<button class='btn btn-primary' onclick='actualizarVideojuego("+id+");'>Modificar</button>";
	return boton;
}


//Funcion para eliminar videojuegos de la API
function deleteVideojuego(id){
	var idVideojuego = id;
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

//Funcion para modificar videojuegos
function actualizarVideojuego(){
	obtenerVideojuegos();
const codigoJuego = document.getElementById("editid").value
const titulo = document.getElementById("titulo").value;
const autor = document.getElementById("autor").value;
const imagen = document.getElementById("imagen").value;
const categoria = document.getElementById("categoria").value;
const descripcion = document.getElementById("descripcion").value;

var addresult;
	var miVideojuego = {id:codigoJuego, titulo:titulo,autor:autor,imagen:imagen,categoria:categoria,descripcion:descripcion};
	 fetch('http://localhost:3000/videojuegos/'+codigoJuego, {
		method: "put",
		body: JSON.stringify(miVideojuego),
	  headers: {
	 'Accept': 'application/json',
	 'Content-type': 'application/json; charset=UTF-8',
	  }}).then(response=>response.json()).then(data=>addresult=data);
	  
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






//Funcion para obtener videojuegos

function obtenerVideojuegos() {
	fetch('http://localhost:3000/videojuegos')
		  .then(res=>res.json())
		  .then(data=>{
			  videojuegos=data;
			  listaVideojuegos(data)})
		  .catch(error => {
				  alert(error);
			  })
}


function codigoCat(catstr) {
  var code="null";
  switch(catstr) {
	  case "accion":code="c1";break;
	  case "estrategia":code="c2";break;
	  case "deporte":code="c3";break;
	  case "carreras":code="c4";break;
  }
  return code;
}   
	var orden=0;
	
	function listaVideojuegos(videojuegos) {
		var t=document.getElementById("name");
		t.setAttribute("onclick", "orden*=-1;listaVideojuegos(videojuegos);");
		var num = videojuegos.length;
		var listado=document.getElementById("listado");
		var ids,titles,autor,images,categories,description,actions;
		var tbody=document.getElementById("tbody"),nfila=0;
		tbody.innerHTML="";
		var catcode;
		for(i=0;i<num;i++) tbody.innerHTML+=fila;
		var tr; 
		ids=document.getElementsByClassName("id");
		titles=document.getElementsByClassName("titulo");
		autor=document.getElementsByClassName("autor");
		categories=document.getElementsByClassName("categoria");   
		images=document.getElementsByClassName("imagen");   
		description=document.getElementsByClassName("descripcion"); 
		actions=document.getElementsByClassName("action"); 
		if(orden===0) {orden=-1;t.innerHTML="Nombre"}
		else
		   if(orden==1) {ordenarAsc(videojuegos,'titulo');t.innerHTML="Nombre A";t.style.color="darkgreen"}
		   else 
			 if(orden==-1) {ordenarDesc(videojuegos,'titulo');t.innerHTML="Nombre D";t.style.color="blue"}
		  
			var boton="";
			var boton2="";
	
			  listado.style.display="block";
		for(nfila=0;nfila<num;nfila++) {
			  ids[nfila].innerHTML=videojuegos[nfila].id;
			  boton = crearBoton(videojuegos[nfila].id);
			  boton2 = crearBotonModificar(videojuegos[nfila].id);
			  titles[nfila].innerHTML=videojuegos[nfila].titulo;
			  autor[nfila].innerHTML=videojuegos[nfila].autor;
			  categories[nfila].innerHTML=videojuegos[nfila].categoria;
			  catcode=codigoCat(videojuegos[nfila].categoria);
			  description[nfila].innerHTML=videojuegos[nfila].descripcion;
			  tr=categories[nfila].parentElement;
			  tr.setAttribute("class",catcode);
			  images[nfila].innerHTML="<img src='"+videojuegos[nfila].imagen+"'>";
			  images[nfila].firstChild.setAttribute("onclick","window.open('"+videojuegos[nfila].imagen+"');" );
			  actions[nfila].innerHTML= boton+boton2;
	
		  }
	  }

  function ordenarDesc(p_array_json, p_key) {
	p_array_json.sort(function (a, b) {
	   if(a[p_key] > b[p_key]) return -1;
 if(a[p_key] < b[p_key]) return 1;
 return 0;
	});
 }
 
 function ordenarAsc(p_array_json, p_key) {
	p_array_json.sort(function (a, b) {
	   if(a[p_key] > b[p_key]) return 1;
 if(a[p_key] < b[p_key]) return -1;
 return 0;
	});
 }