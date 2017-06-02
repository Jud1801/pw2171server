<?php
	require("utilerias.php");

	function valida(){
		$respuesta=false;
		$conexion=conecta();
		$u=GetSQLValueString($_POST["usuario"],"text");
		$c=GetSQLValueString(md5($_POST["clave"]),"text");
		
		$consulta=sprintf("select usuario, clave from usuarios where usuario=%s and clave=%s limit 1", $u, $c);

		$resultado=mysql_query($consulta);
		
		if(mysql_num_rows($resultado)>0){
			$respuesta=true;
		}

		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
	}

	function datosUsuario(){
		$respuesta=false;
		$conexion=conecta();
		$u=GetSQLValueString($_POST["usuario"],"text");
		
		$consulta=sprintf("select * from usuarios where usuario=%s limit 1", $u);
		$resultado=mysql_query($consulta);

		$n="";
		$c="";
		$d=0;
		$v=0;

		if(mysql_num_rows($resultado)>0){
			$respuesta=true;
			//Recuperar los datos de la consulta
			if($registro=mysql_fetch_array($resultado)){
				$n = $registro["nombre"];
				$c = $registro["clave"];
				$d = $registro["departamento"];
				$v = $registro["vigencia"];
			}
		}

		$salidaJSON = array('respuesta' 	=> $respuesta,
		 					'nombre'		=> $n,
		 					'clave'			=> $c,
		 					'departamento'	=> $d,
		 					'vigencia'		=> $v);

		print json_encode($salidaJSON);
	}

	function alta(){
		$respuesta=false;
		$conexion=conecta();

		$u = GetSQLValueString($_POST["usuario"],"text");
		$n = GetSQLValueString($_POST["nombre"],"text");
		$c = GetSQLValueString(md5($_POST["clave"]),"text");
		$d = GetSQLValueString($_POST["departamento"],"int");
		$v = GetSQLValueString($_POST["vigencia"],"int");

		//Buscar si existe / USUARIO REPETIDO
		$busca = sprintf("select usuario from usuarios where usuario=%s", $u);
		$repetido = mysql_query($busca);

		if(mysql_num_rows($repetido)==0){ //SI NO EXISTE EL REGISTRO >:D
			$inserta = sprintf("insert into usuarios values(default,%s,%s,%s,%d,%d)", $u,$n,$c,$d,$v);
			mysql_query($inserta);

			if(mysql_affected_rows()>0){
				$respuesta = true;
			}
		}

		$salidaJSON = array('respuesta' => $respuesta );
		print json_encode($salidaJSON);
	}

	function baja(){
		$respuesta=false;
		$conexion=conecta();

		$u = GetSQLValueString($_POST["usuario"],"text");

		//Buscar si existe / USUARIO REPETIDO
		$consulta = sprintf("delete from usuarios where usuario=%s", $u);
        mysql_query($consulta);

        if(mysql_affected_rows()>0){
            $respuesta = true;
        }

        $arregloJSON = array('respuesta' => $respuesta );
        print json_encode($arregloJSON);
	}

	//Menú principal
	$opcion=$_POST["opcion"];
	switch ($opcion) {
		case 'valida':
			valida();
			break;
		case 'datosusuario':
			datosUsuario();
			break;
		case 'alta':
			alta();
			break;
		case 'baja':
			baja();
			break;
		default:
			# code...
			break;
	}
?>