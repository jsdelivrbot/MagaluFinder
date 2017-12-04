var Lat, Long,numOfRows
var contador = 0

function ordenarDistancias(latitude,longitude){
  lat=latitude
  long=longitude
  var magaluFinder = angular.module('MagaluFinder', []);
  var table = document.getElementById("tableLojas");
  // Captura a quantidade de linhas já existentes na tabela
  numOfRows = table.rows.length;
 
  var magaluFinder = angular.module('MagaluFinder', []);
  magaluFinder.controller('ATabela', ['$scope','$http', function($scope,$http) {
    $scope.array=[]
    $scope.loja= []
    $scope.endereco = []
    $scope.cidade = []
    $scope.distancia = []
    $scope.json=0;
    for (i=1;i<numOfRows;i++){
      $scope.loja.push(table.rows[i].cells[0].innerHTML);
      $scope.endereco.push((table.rows[i].cells[1].innerHTML)+' ' +(table.rows[i].cells[2].innerHTML));
      $scope.cidade.push(table.rows[i].cells[2].innerHTML);
      var enderecoCliente = lat+','+long;
    }

    function chamaBusca(){
      buscaLoja()
    }
    setTimeout(chamaBusca,500)
    /*var time = 0
    for(i=1;i<numOfRows;i++){

      setTimeout(buscaLoja,time)
      time=time+1000
    }*/
    function buscaLoja(){
        var baseUrl = 'https://cors-every.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins='+enderecoCliente+'&destinations='+$scope.endereco[contador]+'&key=AIzaSyDRrW9xU9wXRS67yz-vGYPihbn2cUDsGhg';
        $http.get(baseUrl).then(function(response) {
        $scope.meters = response.data.rows[0].elements[0].distance.text
        $scope.n=$scope.meters.search('km')
        
        //Caso seja metros, será dividido por 1000;
        if($scope.n < 0){
          $scope.distanciaExata=(parseInt(response.data.rows[0].elements[0].distance.text)/1000) + ' km'
          $scope.distanciaExata=$scope.distanciaExata.replace('.',',')
        }else{
          $scope.distanciaExata=response.data.rows[0].elements[0].distance.text
        }
        
        $scope.distancia.push($scope.distanciaExata)
        $scope.array.push({ 'distancia':$scope.distancia[($scope.json)],
                            'loja':$scope.loja[($scope.json)],
                            'endereco':$scope.endereco[($scope.json)],
                            'cidade':$scope.cidade[($scope.json)]})
        if (contador == (numOfRows-1)){
          setTimeout(ativarTabela,500)
        }else{
          chamaBusca()
        }
        $scope.json++
        }, function(err) {
        console.log = err
        });
        
        contador++
        
      }

    
  }]);
  
}

function ativarTabela(){
  document.getElementById('Searching').style.display = 'none'
  document.getElementById('divTabela').style.display = 'block'

}


function initMap() {
  var cliente = {lat: Lat, lng: Long};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: cliente
  });
  var marker = new google.maps.Marker({
    position: cliente,
    map: map
  });

  for (i=0;i<=lojas.length;i++){
    Latitude = lojas.Lat
    Longitude = lojas.Long
    var marker = new google.maps.Marker({
      position: {lat:Latitude,lng:Longitude},
      map: map
    });
  }
}