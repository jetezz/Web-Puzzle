var _ANCHO_=360,
	_ALTO_=240;

	var ancho=6,
		alto=4,
		foto=false,
		finalizado=false,
		dificultad=1,
		puzzle=[],
		puzzlemal=[],
		piezasmal,
		contador=0,
		posix1,
		posix2,
		posiy1,
		posiy2,
		colaux,
		filaaux,
		tiempofinal,
		movimientosfinal=0,
		iniciado=false,
		
		pix;


function prepararcanvas(){
	let cvs= document.querySelectorAll('canvas');

	cvs.forEach(function(e){
		e.width = _ANCHO_;
		e.height = _ALTO_;
	});

	// DRAG&DROP
	let cv01=document.querySelector('#cv01');
	cv01.ondragover=function(e){
		e.stopPropagation();
		e.preventDefault()//return false;
	cv01.style.border = '3px solid #E62F2F';
		
		cv01.style.boxShadow = '0 0 20px #E62F2F';
	};
	

	cv01.ondragleave = function(e)
	{
		
		
		cv01.style.border = '1px solid #234';
		cv01.style.boxShadow = 'none';
	}




	cv01.ondrop=function(e){
		
		e.stopPropagation();
		e.preventDefault()//return false;
		cv01.style.border = '1px solid #234';
		cv01.style.boxShadow = 'none';
		if(iniciado==false){
		let fichero=e.dataTransfer.files[0];
			fr=new FileReader();

			fr.onload=function(){
				limpiar(cv01)
				let img=new Image();
				img.onload=function(){
					let ctx=cv01.getContext('2d');
					ctx.drawImage(img,0,0,cv01.width,cv01.height);
					
					pcopiar();
						line();
						foto=true;
						document.getElementById("comenzar").disabled =false;

				};

				img.src=fr.result;
			}
			fr.readAsDataURL(fichero);
	}
}

 
}
function juego(){

	let dificultad = document.getElementById("dificultad").value;
	


	cv =document.querySelector("#cv02");
	limpiar(cv)

	if(dificultad==1){
		ancho=6;
		alto=4;

	}
	if(dificultad==2){
		ancho =9;
		alto=6;
	}
	if(dificultad==3){
		ancho=12;
		alto=8;
	}
	console.log(dificultad)
	console.log(ancho)
	console.log(alto)

	pcopiar()
	cogerdifi()

	line()
	


}

function ponerfoto(file)
{
	ponerimagen(file.files[0]);	
  	
}

function ponerimagen(e)
{
	
		
		
			let fr = new FileReader();

			fr.onload = function()
				{
					let img = new Image();
					img.onload = function()
					{
						limpiar(cv01);
						let ctx = cv01.getContext('2d');
						ctx.drawImage(img, 0 ,0, cv01.width, cv01.height);
						pcopiar();
						cogerdifi()
						line();
					};
					img.src = fr.result;
					isphotoPlaced = true;
					foto=true;
				};

			fr.readAsDataURL(e);
			document.getElementById("comenzar").disabled =false;
		
	}
	





function seleccionar(){

	let cv=document.querySelector('#cv01'),
	ctx=cv.getContext('2d');


	ctx.font='bold 20px Arial'
	ctx.textAlign = 'center'
	

	
	ctx.lineWidth=1;
	ctx.fillText('Haz click o arrastra una imagen aquí',cv.width/2,cv.height/2);
}
function prueba01(){

	let cv=document.querySelector('#cv01'),
	ctx=cv.getContext('2d');

	ctx.strokeStyle='#a00';
	ctx.lineWidth=2;
	ctx.strokeRect(0,0,100,75);
}
function transladar(){
	let cv=document.querySelector('#cv01'),
	ctx=cv.getContext('2d');


	ctx.translate(10,10);
}
function escalar(){
	let cv=document.querySelector('#cv01'),
	ctx=cv.getContext('2d');


	ctx.scale(1.3,1.3);
}

function rotar(){
	let cv=document.querySelector('#cv01'),
	ctx=cv.getContext('2d');
	ang=45;


	ctx.rotate(Math.PI*(25/180));
}
function limpiar(cv){

	

	cv.width = cv.width ;

}
function pintarimagen0(){
	let cv=document.querySelector('#cv01'),
	ctx=cv.getContext('2d'),
	img=new Image();


	img.onload=function(){
		ctx.drawImage(img,0,0,cv.width, cv.height);


	};
	img.src='fotos/no-hay-imagen-disponible.jpg';

	



}
function pintarimagen2(){
	let cv=document.querySelector('#cv01'),
	ctx=cv.getContext('2d'),
	img=new Image();


	img.onload=function(){
		ctx.drawImage(img,300,300,100,100,20,20,100,100);


	};
	img.src='fotos/35.jpg';

	



}
function pcopiar(){
	let cv01=document.querySelector('#cv01'),
		cv02=document.querySelector('#cv02'),
		ctx01=cv01.getContext('2d'),
		ctx02=cv02.getContext('2d'),
		imgData;

		imgData=ctx01.getImageData(0,0,cv01.width,cv01.height);

		ctx02.putImageData(imgData,0,0);



}
function line(){
	console.log("entra en esta puta miedadsdasdda")
	let    cv=document.querySelector('#cv02'),
		  ctx=cv.getContext('2d'),
		ncols=ancho;
		dimx=cv.width /ancho,
		dimy= cv.height/alto;
	ctx.strokeStyle=document.querySelector('#color-borde').value;
	ctx.beginPath();
	
	ctx.lineWidth=2;


	for(let i=0;i<ncols;i++){

		//lineas horizontales
		ctx.moveTo(0,i*dimy);
		ctx.lineTo(cv.width,i*dimy);

		//lineas verticales
		ctx.moveTo(i*dimx,0);
		ctx.lineTo(i*dimx,cv.height);
	}

	ctx.stroke();

}
function cambiarcolor(){
	let cv =document.querySelector('#cv02'),
	ctx =cv.getContext('2d');

	ctx.strokeStyle=document.querySelector('#color-borde').value;
	line();
}
function comenzar(){
	
	if (foto==true){
		finalizado=false;
		iniciado=true;
		document.getElementById("finalizar").disabled =false;
		document.getElementById("ayuda").disabled =false;
		document.getElementById("cambiar").disabled=true;
		document.getElementById("color-borde").disabled=true;
		document.getElementById("comenzar").disabled=true;
		document.getElementById("dificultad").disabled=true;
		document.querySelector('.estadisticas').innerHTML = 
		`<h3>El juego esta activo</h3>
		<h4>Marcador</h4>
		<p id="mal">piezas mal:</p>
		<p id="movimi">Movimientos: </p>
		<p id="tiempo" Tiempo transcurrido:>  segundos </p>`;

		tiempo();
		inipuzzle2()
		piezasmall()
		cambiarposi()


	}

}
function finalizar(){

	document.getElementById("finalizar").disabled =true;
		document.getElementById("ayuda").disabled =true;
		document.getElementById("cambiar").disabled=false;
		document.getElementById("color-borde").disabled=false;
		document.getElementById("comenzar").disabled=false;
		document.getElementById("dificultad").disabled=false;
		finalizado=true;

		document.querySelector('.estadisticas').innerHTML=null;

		alertify.alert(`No has terminado el puzzle `, `tiempo ${tiempofinal} segundos
		 Movimientos: ${movimientosfinal} Piezas sin colocar ${piezasmal} D: ` ).set('label','cerrar');

let cv=document.querySelector('#cv01'),
	cv2=document.querySelector('#cv02'),
	ctx=cv.getContext('2d');
	
	ctx2=cv2.getContext('2d');
	limpiar(cv2);
	limpiar(cv)
	foto=false;
	movimientosfinal=0;
	iniciado=false;




}
function finalizar2(){
	document.getElementById("finalizar").disabled =true;
		document.getElementById("ayuda").disabled =true;
		document.getElementById("cambiar").disabled=false;
		document.getElementById("color-borde").disabled=false;
		document.getElementById("comenzar").disabled=false;
		document.getElementById("dificultad").disabled=false;
		finalizado=true;

		document.querySelector('.estadisticas').innerHTML=null;

		let cv=document.querySelector('#cv01'),
	cv2=document.querySelector('#cv02'),
	ctx=cv.getContext('2d');
	
	ctx2=cv2.getContext('2d');
	limpiar(cv2);
	limpiar(cv)
	foto=false;
	movimientosfinal=0;
	iniciado=false;
}
function tiempo(){

	var n = 0;
	
var l = document.getElementById("tiempo");
var forda =window.setInterval(function(){
	if (finalizado==true){
		clearInterval(forda)
	}
  l.innerHTML = `Segundos: ${n}`;
  n++;
  tiempofinal=n;
  console.log("gorda")
},1000);


}
function desordenar(){
	auxancho=ancho;
	auxlargo=largo;
	for (i=0;i<auxlargo;i++){
		for(j=0;j<auxanchox;j++){
			img=new Image();
		}
	}
	img=new Image();

}


function cogerdifi(){
	console.log(dificultad)
	a=document.getElementById("dificultad").value
	dificultad=a;
	console.log(dificultad)


	console.log("asdasdasdasd")
	if (dificultad==1){
		pix=60;
		ancho=6
		alto=4
	}
	if (dificultad==2){


		ancho=9
		alto=6
		pix=40
	}
	if (dificultad==3){
		ancho=12
		alto=8
		pix=30;
	}




	
}
function inipuzzle2(){
cogerdifi();
console.log(pix)

	let cv=document.querySelector('#cv01'),
	cv2=document.querySelector('#cv02'),
	ctx=cv.getContext('2d');
	
	ctx2=cv2.getContext('2d');
	
	console.log(ancho)
	console.log(alto)
	for(i=0;i<ancho;i++){
		let aux=[]

		for(j=0;j<alto;j++){

			img=new Image();
			img=ctx.getImageData(pix*i,pix*j,pix,pix);
			aux[j]={}
			aux[j].imgData=img;
			aux[j].i=i;
			aux[j].j=j;
			//sctx2.putImageData(pieza[j],pix*i,pix*j);

			

		}
		
		puzzle[i]=aux;
		aux=null;

	}

	

	

	

	

		

	randon()

}
function randon(){

	let cv=document.querySelector('#cv01'),
	cv2=document.querySelector('#cv02'),
	ctx=cv.getContext('2d'),
	ctx2=cv2.getContext('2d');


	

	for (i=0;i<ancho;i++){
		let aux2=[]
		for(j=0;j<alto;j++){
			let aux=puzzle[i][j]

			aux2[j]={}
			aux2[j].imgData=aux.imgData;
			aux2[j].i=i;
			aux2[j].j=j;


			

		}
		puzzlemal[i]=aux2;
		aux2=null
	}
	console.log(puzzlemal)


	for(i=0;i<100;i++){
		let a1=asds(0,ancho-1)
			b1=asds(0,alto-1)
			a2=asds(0,ancho-1)
			b2=asds(0,alto-1)
			
		let odio =puzzlemal[a1][b1]
		
		puzzlemal[a1][b1]=puzzlemal[a2][b2]
		puzzlemal[a2][b2]=odio
	
}


		
	

	
	limpiar(cv2)

	
			
	for(i=0;i<ancho;i++){
		
		for(j=0;j<alto;j++){

			ctx2.putImageData(puzzlemal[i][j].imgData,pix*i,pix*j);

			

			

		}
		
		
	}
	line()



}
function asds(min,mas){
	return Math.floor(Math.random()*(mas-min +1))+min;
}
function ayuda(){
	let cv=document.querySelector('#cv01'),
	cv2=document.querySelector('#cv02'),
	ctx=cv.getContext('2d'),
	ctx2=cv2.getContext('2d');
	limpiar(cv2)
	dibujameesta();
	for(i=0;i<ancho;i++){
		
		for(j=0;j<alto;j++){

			if(puzzle[i][j].i!=puzzlemal[i][j].i || puzzle[i][j].j!=puzzlemal[i][j].j ){
				ctx2.lineWidth = 2;
 			
 			
			ctx2.fillStyle = "rgba(5,200,200,0.6)";
			ctx2.fillRect(i*pix,j*pix,pix,pix);
			}

			

			

		}

		
		
	}
	line()



}
function piezasmall(){
	piezasmal=0;
for(i=0;i<ancho;i++){
		
		for(j=0;j<alto;j++){

			if(puzzle[i][j].i!=puzzlemal[i][j].i || puzzle[i][j].j!=puzzlemal[i][j].j ){
				piezasmal++
			}

			

			

		}
		
		
		
	}

document.getElementById('mal').innerText = `piezas mal:${piezasmal}`;
if (piezasmal==0){
			mensaje();
		}

}
function cambiarposi(){
	if(foto==true){


	cv02.onmousemove = function(e)

	{
		if(finalizado==false){

		let x  =e.offsetX,
 			y  =e.offsetY,
 			dim=e.target.width/ancho,

 			[col,fila]=sacarfilacolmna(e);
 			
 			
 			
 			
 			//SACAR FILA Y COLUMNA
 			

 			
 			// MOSTRAR REGION IMAGEN ORIGINAL

 			limpiar(cv02)
 			dibujameesta()

 			ctx2.lineWidth = 2;
			ctx2.strokeStyle = "blue";
			ctx2.strokeRect(col*pix,fila*pix,pix,pix);
			if(contador==1){
				ctx2.lineWidth = 2;
			ctx2.fillStyle = "rgba(5,200,200,0.6)";
			ctx2.fillRect(colaux*pix,filaaux*pix,pix,pix);
			}

			}
		}
 			

cv02.onclick=function(e){
	if(finalizado==false){
 		let x  =e.offsetX,
 			y  =e.offsetY,
 			dim=e.target.width/ancho,

 			[col,fila]=sacarfilacolmna(e);
 			
 			
 			
 			
 			//SACAR FILA Y COLUMNA
 			

 			
 			// MOSTRAR REGION IMAGEN ORIGINAL

 			contador++;
 			posix2=col
 			posiy2=fila
 			console.log("contador"+contador)
 			if(contador==1){




 				posix1=col
 				posiy1=fila


 		ctx2.lineWidth = 2;
 			colaux=col;
 			filaaux=fila
			ctx2.fillStyle = "rgba(5,200,200,0.6)";
			ctx2.fillRect(col*pix,fila*pix,pix,pix);
			

 			}


 			if(contador==2){
 				console.log("posix1"+ posix1)
 				console.log("posix2" +posix2)
 				console.log("posiy1" +posiy1)
 				console.log("posiy2" +posiy2)


			
		let odio =puzzlemal[posix1][posiy1]
		
		puzzlemal[posix1][posiy1]=puzzlemal[posix2][posiy2]
		puzzlemal[posix2][posiy2]=odio
		contador=0;

		contarmovi()


		dibujameesta()


 			}

 			console.log(contador);

 		}

console.log(contador);
}
}
}
function sacarfilacolmna(e){

	let x  =e.offsetX,
 			y  =e.offsetY,
 			dim=e.target.width/ancho,
 			fila,col;

		col=Math.floor(x/dim);
 		fila=Math.floor(y/dim);

 		return [col,fila];
 	}
function dibujameesta(){
	for(i=0;i<ancho;i++){
		
		for(j=0;j<alto;j++){

			ctx2.putImageData(puzzlemal[i][j].imgData,pix*i,pix*j);

			

			

		}
		
		
	}
	line()
	piezasmall()
}
function mensaje(){

	alertify.alert(`Has terminado el puzle `, `Puzzle terminado en ${tiempofinal} con ${movimientosfinal} movimientos :'D ` ).set('label','cerrar');
	finalizar2()
}
function contarmovi(){
	movimientosfinal++
	document.querySelector('#movimi').innerHTML=`Movimientos: ${movimientosfinal}`

}
