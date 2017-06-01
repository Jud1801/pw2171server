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

	//Sección de declaración de eventos
	$("#btnEntrar").on("click",entrar);
	$("#txtUsuario").on("keypress", teclaUsuario);
	$("#txtClave").on("keypress", teclaClave);
}

$(document).ready(iniciaApp);