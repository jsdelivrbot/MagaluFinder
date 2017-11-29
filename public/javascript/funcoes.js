function ativDiv(){
	if (document.getElementById('selectGrupo').value==2) {
		document.getElementById('divFilial').style.display = 'block'
	}else{
		document.getElementById('divFilial').style.display = 'none'
	}
	
}

function search(procurar){
	document.getElementById('search').value = procurar
	document.getElementById('formPost').submit()

}