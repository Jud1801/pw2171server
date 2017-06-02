// $ = jquery - son equvalentes

var iniciaApp = function(){
	// alert("Hola App :D");

	//Funcionalidad
	var entrar = function(){
		// alert($("#txtUsuario").val());
		// alert($("#txtClave").val());
		var usuario = $("#txtUsuario").val();
		var clave 	= $("#txtClave").val();

		var parametros = "opcion=valida"+
						 "&usuario="+usuario+
						 "&clave="+clave+
						 "&id="+Math.random(); //El random sirve para que se este refrescando la información
		
		var validaEntrada = $.ajax({
			method:"POST",
			url:"php/datos.php",
			data:parametros,
			dataType:"json"
		});

		validaEntrada.done(function(data){
			if(data.respuesta){
				$("#datosUsuario").hide("slow");
				$("nav").show("slow");
				$("#secUsuarios").show("slow");

				$("#txtNomUsuario").focus();
			}
			else{
				alert("Usted no es bienvenido señor feo D:<");
			}
		});

		validaEntrada.fail(function(jqError, textStatus){
			alert("Salga corriendo D: "+textStatus);
		});

	}
	var teclaUsuario = function(tecla){
		if(tecla.which==13){
			$("#txtClave").focus();
		}
	}
	var teclaClave = function(tecla){
		if(tecla.which==13){
			entrar();
		}
	}

	//----------------------------------->Metodo para rellenado de datos! :D
	var datosUsuario = function(){
		var usuario = $("#txtNomUsuario").val();

		var parametros = "opcion=datosusuario"+
						 "&usuario="+usuario+
						 "&id="+Math.random();

		var du = $.ajax({
			method:"POST",
			url:"php/datos.php",
			data:parametros,
			dataType:"json"
		});

		du.done(function(data){
			if(data.respuesta){
				$("#txtNomNombre").val(data.nombre);
				// $("#txtNomClave").val(data.clave);
				$("#txtNomDepto").val(data.departamento);
				$("#txtNomVigencia").val(data.vigencia);
			}
			else{
				$("#txtNomNombre").val("");
				$("#txtNomClave").val("");
				$("#txtNomDepto").val("");
				$("#txtNomVigencia").val("");

				$("#txtNomNombre").focus();
			}
		});

		du.fail(function(jqError, textStatus){
			alert("Apague la computadora y salga lentamente D:"+textStatus);
		});
	}
	//función del txtNomUsuario de la seccion secUsuario
	var teclaNomUsuario = function(tecla){
		if(tecla.which==13){
			datosUsuario();
		}
	}

	var altas = function(){
		var usuario = $("#txtNomUsuario").val();
		var nombre 	= $("#txtNomNombre").val();
		var clave 	= $("#txtNomClave").val();
		var depto 	= $("#txtNomDepto").val();
		var vig 	= $("#txtNomVigencia").val();

		var parametros = "opcion=alta"+
						 "&usuario="+usuario+
						 "&nombre="+nombre+
						 "&clave="+clave+
						 "&departamento="+depto+
						 "&vigencia="+vig+
						 "&id="+Math.random();

		var alta = $.ajax({
			method:"POST",
			url:"php/datos.php",
			data:parametros,
			dataType:"json"
		});

		alta.done(function(data){
			if(data.respuesta){
				alert("Usuario registrado exitosamente :D");
			}
			else{
				alert("Usuario no registrado y/o repetido D:<");
			}
		});

		alta.fail(function(jqError, textStatus){
			alert("Algo murio dentro de usted u-u"+textStatus);
		});
	}

	var bajas = function(){
		var usuario = $("#txtNomUsuario").val();

		var parametros = "opcion=baja"+
						 "&usuario="+usuario+
						 "&id="+Math.random();

		var baja = $.ajax({
			method:"POST",
			url:"php/datos.php",
			data:parametros,
			dataType:"json"
		});

		baja.done(function(data){
			if(data.respuesta){
				alert("Usuario eliminado TnT");
			}
			else{
				alert("Usuario no eliminado D:");
			}
		});

		baja.fail(function(jqError, textStatus){
			alert("Algo murio dentro de usted u-u"+textStatus);
		});
	}

	//Sección de declaración de eventos
	$("#btnEntrar").on("click",entrar);
	$("#txtUsuario").on("keypress", teclaUsuario);
	$("#txtClave").on("keypress", teclaClave);

	//Validación de acciones secUsuario
	$("#txtNomUsuario").on("keypress", teclaNomUsuario);

	//Botones del menu
	$("#btnAltas").on("click", altas);
	$("#btnBajas").on("click", bajas);
}

$(document).ready(iniciaApp);