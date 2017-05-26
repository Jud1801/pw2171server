// $ = jquery - son equvalentes

var iniciaApp = function(){
	// alert("Hola App :D");

	//Funcionalidad
	var valida = function(){
		//Obtener datos
		var usuario = $("#txtUsuario").val();
		var clave   = $("#txtClave").val();
		
		var parametros = "opcion=valida"+
		                 "&usuario="+usuario+
		                 "&clave="+clave;
		
		//Validamos que no esten vacíos
		if(usuario!="" && clave!="")
		{
			//Hacemos la petición remota
			$.ajax({
				cache:false,
				type:"POST",
				url: "php/datos.php",
				dataType:"json",
				data:parametros,
				success: function(response){
					if(response.respuesta == true){    
						$("#datosUsuario").hide("slow");
						$("nav").show("slow"); 
					}
					else{
						alert("Usuario y/o contraseña incorrectos D:");
					}
				},
				error: function(xhr,ajaxOptions,thrownError){
					alert("Algo murio dentro de ti T:");
				}
			});
		}
		else{
			alert("Usuario y clave necesarios");
		}
	}
	var teclaUsuario = function(tecla){
		if(tecla.which==13){
			$("#txtClave").focus();
		}
	}
	var teclaClave = function(tecla){
		if(tecla.which==13){
			valida();
		}
	}

	//ACCIONES BOTONES MENU
	var Altas = function(){
		//Mostrar cuadros de texto para ingresar datos
		$("h2").html("Alta de usuarios");
		$("#artConsultas").hide("slow");
		$("#artAcciones").show("slow");

		$("#inAcciones").show("slow");

		$("#artAcciones > button").hide();
		$("#btnGuardar").show();
	}

	var Bajas = function(){
		//Mostrar cuadros de texto para ingresar datos
		$("h2").html("Baja de usuarios");
		$("#artConsultas").hide("slow");
		$("#artAcciones").show("slow");

		$("#inAcciones").hide("slow");

		$("#artAcciones > button").hide();
		$("#btnBorrar").show();
	}

	var Cambios = function(){
		//Mostrar cuadros de texto para ingresar datos
		$("h2").html("Buscar usuarios a cambiar");
		$("#artConsultas").hide("slow");
		$("#artAcciones").show("slow");
		
		$("#inAcciones").hide("slow");

		$("#artAcciones > button").hide();
		$("#btnBuscar").show();
	}

	var Consulta = function(){
		
		var parametros="opcion=consultas";
		
		$.ajax({
			cache:false,
			type:"POST",
			dataType:"json",
			url:"php/datos.php",
			data:parametros,
			success:function(response){
				$("#artAcciones").hide("slow");
				$("#tablaConsultas").html(response.renglones);
				$("#artConsultas").show("slow");
			},
			error:function(xhr,ajaxOptions,thrownError){
					alert("No se pudo conectar al servidor");
			}
		});
	}

	//ACCIONES BOTONES ACCION 
	var Guardar = function(){
		var usuario   = $("#txtUsuarioNombre").val(); 
		var nombre    = $("#txtNombre").val();
		var clave     = $("#txtClaveNombre").val();
		var depto     = $("#txtDepartamento").val();
		var vigencia  = $("#txtVigencia").val();
		
		if(usuario!="" && nombre!="" && clave!="" && depto!="" && vigencia!="")
		{
			//Parámetros para el ajax
			var parametros = "opcion=guarda"+
							 "&usuario="+usuario+
							 "&nombre="+nombre+
							 "&clave="+clave+
							 "&departamento="+depto+
							 "&vigencia="+vigencia;
			$.ajax({
				cache:false,
				type:"POST",
				dataType:"json",
				url:"php/datos.php",
				data:parametros,
				success:function(response){
					if(response.respuesta == true){
						alert("Usuario registrado");
						$("#artAcciones > input").val("");
						$("#inAcciones > input").val("");
					}
					else
						alert("Usuario no registrado y/o duplicado");
				},
				error:function(xhr,ajaxOptions,thrownError){
					alert("No se pudo conectar al servidor");
				}
			});
		}
		else
			alert("Todos los campos son obligatorios");

	}

	var Borrar = function(){
		var usuario  = $("#txtUsuarioNombre").val(); 
		
		if(usuario!="")
		{
			var parametros = "opcion=borra"+
							 "&usuario="+usuario;
			$.ajax({
				cache:false,
				type:"POST",
				dataType:"json",
				url:"php/datos.php",
				data:parametros,
				success:function(response){
					if(response.respuesta == true){
						alert("Usuario eliminado");
						$("#artAcciones > input").val(""); 
					}
					else
						alert("Usuario no eliminado");
				},
				error:function(xhr,ajaxOptions,thrownError){
					alert("No se pudo conectar al servidor");
				}
			});
		}
		else
			alert("Todos los campos son obligatorios");
	}

	var Buscar = function(){
		var usuario = $("#txtUsuarioNombre").val(); 
		
		if(usuario!="" ){

			var parametros = "opcion=busca"+
							 "&usuario="+usuario;
							 
			$.ajax({
				cache:false,
				type:"POST",
				dataType:"json",
				url:"php/datos.php",
				data:parametros,
				success:function(response){
					if(response.respuesta == true){
						$("h2").html("Cambiar datos usuario");
						$("#artAcciones").show("slow");
						$("#txtUsuarioNombre").show();
						
						$("#txtNombre").val(response.nombre);
						$("#txtDepartamento").val(response.departamento);
						$("#txtVigencia").val(response.vigencia);

						$("#inAcciones").show();
						$("#artAcciones > button").hide();
						$("#btnModificar").show();
					}
					else
						alert("Usuario no registrado");
				},
				error:function(xhr,ajaxOptions,thrownError){
					console.log("No se pudo conectar al servidor");
				}
			});
		}
		else
			alert("Todos los campos son obligatorios");
	}

	var Modificar = function(){
		var usuario = $("#txtUsuarioNombre").val(); 
		var nombre  = $("#txtNombre").val();
		var clave   = $("#txtClaveNombre").val();
		var departamento    = $("#txtDepartamento").val();
		var vigencia    = $("#txtVigencia").val();
		
		if(usuario!="" && nombre!="" && clave!="" && departamento!="" && vigencia!=""){
			var parametros = "opcion=update"+
							 "&usuario="+usuario+
							 "&nombre="+nombre+
							 "&clave="+clave+
							 "&departamento="+departamento+
							 "&vigencia="+vigencia;
							 
			$.ajax({
				cache:false,
				type:"POST",
				dataType:"json",
				url:"php/datos.php",
				data:parametros,
				success:function(response){
					if(response.respuesta == true){
						alert("Usuario actualizado");
						$("#artUsuario > input").val(""); 
						$("#artUsuario > input").val("");
						Cambios();
					}
					else
						alert("Usuario no actualizado");
				},
				error:function(xhr,ajaxOptions,thrownError){
					alert("No se pudo conectar al servidor");
				}
			});
		}
		else
			alert("Todos los campos son obligatorios");

	}

	//Sección de declaración de eventos
	$("#btnEntrar").on("click",valida);
	$("#txtUsuario").on("keypress", teclaUsuario);
	$("#txtClave").on("keypress", teclaClave);

	//BOTONES MENU
	$("#btnAltas").on("click",Altas);
	$("#btnBajas").on("click",Bajas);
	$("#btnCambios").on("click",Cambios);
	$("#btnConsultas").on("click",Consulta);

	//BOTONES ACCION
	$("#btnGuardar").on("click",Guardar);
	$("#btnBorrar").on("click",Borrar);
	$("#btnBuscar").on("click",Buscar);
	$("#btnModificar").on("click",Modificar);

}

$(document).ready(iniciaApp);