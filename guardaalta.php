<?php
	include("utilerias.php"); //include= incluye todo el documento importado - requiere= solo incluye lo que necesitas D:
	$conexion = conecta();
	
	$u= GetSQLValueString($_POST["txtUsuario"],"text");
	$n= GetSQLValueString($_POST["txtNombre"], "text");
	$c= GetSQLValueString(md5($_POST["txtClave"]), "text");
	$d= GetSQLValueString($_POST["txtDepto"], "int");
	$v= GetSQLValueString($_POST["txtVigencia"], "int");

	//VALIDAR QUE EL USUARIO NO SEA REPETIDO
	$repetido= sprintf("select usuario from usuarios where usuario=%s", $u); //En el select devuelve un dataset
	$respuesta= mysql_query($repetido);
	if(mysql_num_rows($respuesta)>0){
		print("Usuario repetido D:<");
		return;
	}

	$consulta= sprintf("insert into usuarios values(default,%s,%s,%s,%d,%d)", $u,$n,$c,$d,$v);
	mysql_query($consulta);

	if(mysql_affected_rows()>0){
		print("Usuario agregado :D");
	}
	else{
		print("Usuario no agregado e.e!");
	}
?>