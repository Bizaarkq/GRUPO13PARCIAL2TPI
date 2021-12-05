var fila="<tr><td class='id'></td><td class='imagen'></td><td class='titulo'></td><td class='autor'></td><td class='categoria'></td><td class='descripcion'></td><td class='action1'></td><td class='action2'></td></tr>";
//variable para almacenar el id actual a modificar
var idmod = null;
var videojuegos = null;

function crearBoton(id){
	var boton="<button class='btn btn-danger' type='button' onclick='deleteVideojuego("+id+");'><i class='far fa-trash-alt'></i></button>";
	return boton;
}

function crearBotonModificar(id){
	var boton="<button type='button' class='btn btn-primary' onclick='moverdatosaform("+id+")'><i class='fas fa-pen'></i></button>"
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
		//location.reload();
		obtenerVideojuegos();
	}
}

//Funcion para modificar videojuegos
function actualizarVideojuego(){
	//obtenerVideojuegos();
	
	var codigoJuego=idmod;
	
	if(codigoJuego != null){
		//const codigoJuego = document.getElementById("editid").value
		var titulo = document.getElementById("titulo").value;
		var autor = document.getElementById("autor").value;
		var imagen = document.getElementById("imagen").value;
		var categoria = document.getElementById("categoria").value;
		var descripcion = document.getElementById("descripcion").value;
		
		var addresult;
		var miVideojuego = {id:codigoJuego, titulo:titulo,autor:autor,imagen:imagen,categoria:categoria,descripcion:descripcion};
		fetch('http://localhost:3000/videojuegos/'+codigoJuego, {
		method: "put",
		body: JSON.stringify(miVideojuego),
		headers: {
			'Accept': 'application/json',
			'Content-type': 'application/json; charset=UTF-8',
		}}).then(response=>response.json()).then(data=>addresult=data);	
		alert("Se edito el videojuego con ID #"+codigoJuego);
	
		
		idmod=null;
		document.getElementById("titulo").value = '';
		document.getElementById("autor").value = '';
		document.getElementById("imagen").value = '';
		document.getElementById("categoria").value = '' ;
		document.getElementById("descripcion").value = '';
		obtenerVideojuegos();
	}else{
		alert("Seleccione un juego a modificar");
	}
}




//Funcion para agregar videojuegos a la API
function addVideojuego(){
	
	var v_titulo = document.getElementById("titulo").value;
	var v_autor = document.getElementById("autor").value;
	var v_imagen = document.getElementById("imagen").value;
	var v_cate = document.getElementById("categoria").value;
	var v_desc = document.getElementById("descripcion").value;
	
	if(v_titulo != '' && v_autor != '' && v_imagen != '' && v_cate != '' && v_desc != ''){
		var videojuegoadd={titulo: v_titulo, autor:v_autor,	imagen: v_imagen, categoria: v_cate, descripcion: v_desc}
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
		//addresult;
		obtenerVideojuegos();
	}else{
		alert("Llene todos los campos del videojuego");
	}
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
		var ids,titles,autor,images,categories,description,action1,action2;
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
		action1=document.getElementsByClassName("action1"); 
		action2=document.getElementsByClassName("action2");
		if(orden===0) {orden=-1;t.innerHTML="Nombre"}
		else
		if(orden==1) {ordenarAsc(videojuegos,'titulo');t.innerHTML="Nombre A";t.style.color="darkgreen"}
		else 
		if(orden==-1) {ordenarDesc(videojuegos,'titulo');t.innerHTML="Nombre D";t.style.color="blue"}
		
		var boton= null;
		var boton2= null;
		
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
			action2[nfila].innerHTML= boton;
			action1[nfila].innerHTML = boton2;
			
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
	
	
	function moverdatosaform(idvid){
		
		idmod = idvid; //pasando la opción escogida a la variable global para la modificación
		
		var videojuego=null;
		var titulof = document.getElementById("titulo");
		var autorf = document.getElementById("autor");
		var imagenf = document.getElementById("imagen");
		var catef = document.getElementById("categoria");
		var descripcionf = document.getElementById("descripcion");
		
		fetch('http://localhost:3000/videojuegos/'+idvid,{method:"GET"})
		.then(res=>res.json())
		.then(data=>{videojuego=data;
			titulof.value = videojuego.titulo;
			autorf.value = videojuego.autor;
			imagenf.value = videojuego.imagen;
			catef.value = videojuego.categoria;
			descripcionf.value = videojuego.descripcion;
		});
		
		document.documentElement.scrollTop = 0;
	}