<?php
	require("utilerias.php");

	function valida(){
		$respuesta = false;	
		$conexion=conecta();

		$u = GetSQLValueString($_POST["usuario"],"text");
		$c = GetSQLValueString(md5($_POST["clave"]),"text");

		$consulta  = sprintf("select usuario,clave from usuarios where usuario=%s and clave=%s limit 1", $u, $c);

		$resultado = mysql_query($consulta);
		
		if(mysql_num_rows($resultado)>0){
			$respuesta = true;
		}
		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}

	function guarda(){
		$respuesta = false;
		$conexion=conecta();

		$u = GetSQLValueString($_POST["usuario"],"text");
		$n = GetSQLValueString($_POST["nombre"],"text");
		$c = GetSQLValueString(md5($_POST["clave"]),"text");
		$d = GetSQLValueString($_POST["departamento"],"int");
		$v = GetSQLValueString($_POST["vigencia"],"int");
		
		$repetido= sprintf("select usuario from usuarios where usuario=%s", $u); //En el select devuelve un dataset
		$duplicado= mysql_query($repetido);
		if(mysql_num_rows($duplicado)>0){
			$arregloJSON = array('respuesta' => $respuesta );
			print json_encode($arregloJSON);
			return;
		}

		$consulta = sprintf("insert into usuarios values(default,%s,%s,%s,%d,%d)",$u,$n,$c,$d,$v);
		mysql_query($consulta);
		//Si el registro se insertó
		if(mysql_affected_rows()>0) {
			$respuesta = true;
		}
		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}

	function borra(){
        $respuesta = false;
        $conexion=conecta();

        $u = GetSQLValueString($_POST["usuario"],"text");

        $consulta= sprintf("delete from usuarios where usuario=%s", $u);
        mysql_query($consulta);

        if(mysql_affected_rows()>0){
            $respuesta = true;
        }

        $arregloJSON = array('respuesta' => $respuesta );
        print json_encode($arregloJSON);
    }

    function busca(){
		$respuesta = false;	
		$conexion=conecta();

		$u = GetSQLValueString($_POST["usuario"],"text");

		$consulta  = sprintf("select * from usuarios where usuario=%s limit 1", $u);

		$resultado = mysql_query($consulta);
		if(mysql_num_rows($resultado)>0){
			$respuesta = true;
			if($registro = mysql_fetch_array($resultado)){
				$arregloJSON = array('respuesta' => $respuesta,
					                 'nombre'    => $registro["nombre"],
					                 "departamento"      => $registro["departamento"],
					                 "vigencia"      => $registro["vigencia"]);
			}
		}
		else{
			$arregloJSON = array('respuesta' => $respuesta);
		}
		print json_encode($arregloJSON);
	}

	function update(){
		$respuesta = false;
		$conexion=conecta();
		$u = GetSQLValueString($_POST["usuario"],"text");
		$n = GetSQLValueString($_POST["nombre"],"text");
		$c = GetSQLValueString(md5($_POST["clave"]),"text");
		$d = GetSQLValueString($_POST["departamento"],"int");
		$v = GetSQLValueString($_POST["vigencia"],"int");	
		$consulta = sprintf("update usuarios set nombre=%s, clave=%s, departamento=%d, vigencia=%d where usuario=%s",$n,$c,$d,$v,$u);
		mysql_query($consulta);
		
		if(mysql_affected_rows()>0){
			$respuesta = true;
		}

		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}

    function consultas(){
		$conexion=conecta();

		$renglones="<tr>";
		$renglones.="<th>Usuario</th><th>Nombre</th><th>Departamento</th><th>Vigencia</th>";
		$renglones.="</tr>";
		
		$consulta = sprintf("select usuario,nombre,departamento,vigencia from usuarios order by usuario");
		
		$resultado = mysql_query($consulta);
		
		if(mysql_num_rows($resultado)>0){
			while($registro = mysql_fetch_array($resultado)){
				$renglones.="<tr>";
				$renglones.="<td>".$registro["usuario"]."</td>";
				$renglones.="<td>".$registro["nombre"]."</td>";				
				$renglones.="<td>".$registro["departamento"]."</td>";
				$renglones.="<td>".$registro["vigencia"]."</td>";
				$renglones.="</tr>";
			}
		}
		else{
			$renglones = "<tr><td colspan=4>Sin usuarios registrados</td></tr>";			
		}
		
		$arregloJSON = array('renglones' => $renglones);
		
		print json_encode($arregloJSON);
	}

	//Menú principal
	$opcion=$_POST["opcion"];
	switch ($opcion) {
		case 'valida':
			valida();
			break;
		case 'guarda':
			guarda();
			break;
		case 'borra':
			borra();
			break;
		case 'busca':
			busca();
			break;
		case 'update':
			update();
			break;
		case 'consultas':
			consultas();
			break;
		default:
			# code...
			break;
	}
?>