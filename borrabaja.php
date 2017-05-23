<?php
	include("utilerias.php"); //include= incluye todo el documento importado - requiere= solo incluye lo que necesitas D:
	$conexion = conecta();
	
	$u= GetSQLValueString($_GET["txtUsuario"],"text");

	$consulta= sprintf("delete from usuarios where usuario=%s", $u);
	mysql_query($consulta);

	if(mysql_affected_rows()>0){
		print("Usuario borrado D:");
	}
	else{
		print("Usuario no borrado :D?");
	}
?>