angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $log, $http, $rootScope,$ionicPopup, $timeout, tagihan) {
  $scope.ada = false;
  $scope.cekTagihan = function(event,data){
    if (event.keyCode==13) {
      $scope.cek(data);
    };
  }
  $scope.cek = function(data){
      data = data.replace(/[^\d]/g,"");
      $http.get($rootScope.url+'api/cek/'+data).then(function(res){
          if ((res.data).length>0) {
            $scope.ada      = true;
            tagihan.kirim(res.data[0]);
            $scope.nama     = res.data[0].nama;
            $scope.alamat   = res.data[0].alamat;
            $scope.nosamw   = res.data[0].nosamw;
            $scope.periode  = res.data[0].periode;
            $scope.met_k    = res.data[0].met_k;
            $scope.total    = res.data[0].total;
            $scope.pakai    = res.data[0].pakai;
            var periodes=[];
            angular.forEach(res.data,function(val,key){
              periodes.push(val.periode)
            });
            $scope.periods = String(periodes);
            $scope.jum      = res.data.length;    
          }else{
            var noSambung = document.getElementById('nomor-sambung');
            noSambung.blur();
            alert($ionicPopup,'Error','Data tidak ada');
          }
      });
  }
})

.controller('RincianCtrl', function($scope, $log, $http, $rootScope,$ionicPopup, $timeout, tagihan, $stateParams) {
  var no = $stateParams.no;
      $http.get($rootScope.url+'api/rinci/'+no).then(function(res){
          if ((res.data).length>0) {
            $scope.datas = res.data;
          }else{
            alert($ionicPopup,'Error','Data tidak ada');
          }
      });
})

.controller('PictCtrl', function($scope, $log, $http, $rootScope,$ionicPopup, $timeout, tagihan, $stateParams) {
  var no    = $stateParams.no;
  var per   = $stateParams.per;
  var sm    = tagihan.ambil();
  angular.forEach(sm,function(val,key){
    $scope.met_k = val.met_k;
  })
  $http.get($rootScope.url+'api/pict/'+no+'/'+per).then(function(res){
      if ((res.data).length>0) {
        $scope.pict = res.data[0].pict;
      }else{
        alert($ionicPopup,'Error','Data tidak ada');
        window.history.back();
      }
  });
})


.controller('InfoCtrl', function($scope, tagihan, $http, $rootScope, $ionicPopup) {
  $scope.loader = true;
    $http.get($rootScope.url+'api/info').then(function(res){
      if ((res.data).length>0) {
        $scope.datas = res.data;
        $scope.loader = false;
      }else{
        alert($ionicPopup,'Error','Data tidak ada');
        $scope.loader = false;
      }
    })
   $scope.refresh = function(){
      $http.get($rootScope.url+'api/info').then(function(res){
        if ((res.data).length>0) {
          $scope.datas = res.data;
          $scope.loader = false;
        }else{
          alert($ionicPopup,'Error','Data tidak ada');
          $scope.loader = false;
        }
      })
     .finally(function() {
       $scope.$broadcast('scroll.refreshComplete');
       $scope.loader = false;
     });
   }
})

.controller('InfoDetailCtrl', function($scope, $stateParams, $http, $rootScope, $ionicPopup) {
    var id = $stateParams.id;
    $scope.loader = true;
    $http.get($rootScope.url+'api/info/'+id).then(function(res){
      if ((res.data).length > 0 ) {
        $scope.datas = res.data;
        $scope.loader = false;
      }else{
        alert($ionicPopup,'Error','Error load data');
        window.history.back();
      }
    })
})


//Aduan detail controller
.controller('AduanCtrl', function($scope, $stateParams, $http, $rootScope,Camera){
    $scope.aduTombol = true;
    $scope.loader = true;
    $http.get($rootScope.url+'api/aduan').then(function(res){
        if ((res.data).length > 0) {
          $rootScope.aduans = res.data;
          $scope.loader = false;
        };
    });
    $scope.refresh = function(){
      $http.get($rootScope.url+'api/aduan').then(function(res){
          if ((res.data).length > 0) {
            $rootScope.aduans = res.data;
            $scope.loader = false;
          };
      })
      .finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.loader = false;
      });
    }
})
//End aduan controller

//Aduan detail controller
.controller('AduanDetailCtrl', function($scope, $stateParams, $http, $rootScope, $ionicPopup){
  $scope.aduTombol = false;
  var id = $stateParams.id;
  $http.get($rootScope.url+'api/aduan/'+id).then(function(res){
      if ((res.data).length>0) {
        $scope.map = {center: {latitude: res.data[0].lat, longitude:  res.data[0].long }, zoom: 17 };
        $scope.nama = res.data[0].nama;
        $scope.hari = res.data[0].hari;
        $scope.tanggal = res.data[0].tanggal;
        $scope.alamat = res.data[0].alamat;
        $scope.jenis = res.data[0].jenis;
        $scope.content = res.data[0].content;
        $scope.pict = res.data[0].pict;
        $scope.options = {scrollwheel: false};
        $scope.marker = {
          id: 0,
          coords: {
            latitude: res.data[0].lat,
            longitude: res.data[0].long
          },
          options: { draggable: false }
        };
      }else{
        alert($ionicPopup,'Error', 'Gagal mengambil data');
        window.history.back();
      }
  })
})
//End aduan controller


//Aduan buat controller
.controller('AduanBuatCtrl', function($scope, $location, $stateParams, $http, $rootScope,Camera, $cordovaGeolocation, $ionicPopup){
      $scope.tbPosting = 'Posting';
      $scope.jenisAdu = [{"jenis":"Air Mati, Air Kecil, Air Keruh"},
                        {"jenis":"Angka Meter Tidak Sesuai"},
                        {"jenis":"Bocor"},
                        {"jenis":"Dana Meter"},
                        {"jenis":"Data Pelanggan"},
                        {"jenis":"Disalurkan ke Persil Lain"},
                        {"jenis":"Kerusakan Acc. (stop kran, plug kran, kran)"},
                        {"jenis":"Kesalahan Rekening"},
                        {"jenis":"Melepas Meter / Merubah Posisi Meter (Meter Dibalik)"},
                        {"jenis":"Menempelkan Magnet"},
                        {"jenis":"Mengambil Air Sebelum WM"},
                        {"jenis":"Menyedot Dengan Pompa"},
                        {"jenis":"Merusak Segel / Segel Putus, tidak ada"},
                        {"jenis":"Meter (Hilang/Pecah/Rusak)"},
                        {"jenis":"Meter Rusak (mati, buram, tertanam, meragukan)"},
                        {"jenis":"Pemakaian"},
                        {"jenis":"Pemasangan Liar / Sambungan Gelap"},
                        {"jenis":"Retribusi ABT"},
                        {"jenis":"Status Disegel/Diputus/Ditutup tapi air masih mengalir"},
                        {"jenis":"Tarif"},
                        {"jenis":"Lainnya"}];
      var lat = null;
      var long = null;
      $scope.pict = null;
      $scope.pictShow = true;
      $scope.getPhoto = function() {
          Camera.getPicture().then(function(imageURI) {
            $scope.pict = imageURI;
          }, function(err) {
            console.err(err);
          }, {
            quality: 75,
            targetWidth: 320,
            targetHeight: 320,
            saveToPhotoAlbum: false
          });
        };
        //Geolocation
      var options = {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
        lat = crd.latitude;
        long = crd.longitude;
      };
      
      function error(err) {
        alert($ionicPopup,'Error','Diharapkan untuk menyalakan lokasi/GPS HP anda')
      };
      
      navigator.geolocation.getCurrentPosition(success, error, options);
      
        //End geolocation

      //Aduan posting
      $scope.posting = function(nama,hp,lokasi,nosamw,jenis,ket,pict){
        $scope.tbPosting = 'Memposting....'; 
        var options = {
          enableHighAccuracy: true,
          timeout: 2000,
          maximumAge: 0
        };
        
        function s(pos) {
          var crd = pos.coords;
          lat = crd.latitude;
          long = crd.longitude;
          postAduan($ionicPopup,nama,hp,lokasi,nosamw,jenis,ket,pict,lat,long, $rootScope, $location);
        };
        
        function e(err) {
          postAduan($ionicPopup,nama,hp,lokasi,nosamw,jenis,ket,pict,lat,long, $rootScope, $location);
        };
        
        navigator.geolocation.getCurrentPosition(s, e, options);
      }

      function postAduan($ionicPopup,nama,hp,lokasi,nosamw,jenis,ket,pict,lat,long,$rootScope, $location){        
      var options = new FileUploadOptions();
              options.fileKey="file";
              options.chunkedMode = false;
              options.mimeType="image/jpeg";
      
              var params = {};
              options.params = params;
      
          var ft = new FileTransfer();
          ft.upload($scope.pict, $rootScope.url+"upload", win, fail, options);
        function win(r) {
          var res = r.response;
          var temps =[];
              $http.post($rootScope.url+'api/aduan',{nama:nama,hp:hp,lokasi:lokasi,nosamw:nosamw,jenis:jenis,ket:ket,pict:res+'.jpg',lat:lat,long:long}).then(function(data){
                  if (data.status==200) {
                    if (data.data.error==true) {
                      alert($ionicPopup,'Error',data.data.teks);
                    }else if (data.data.error==false){
                        //temps={"id":9999,"nama":nama,"alamat":lokasi,"jenis":jenis,"pict":res+'.jpg'};
                        //$rootScope.aduans.unshift(temps);
                        $location.path('/tab/aduan');
                    }
                  };
              }) 
        }
 
        function fail() {
              alert($ionicPopup,'Error','Gagal upload data, coba lagi!');
        }
      }
      //End aduan posting
  })
    //


//End aduan buat controller

//Akun controller
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
//End akun controller

//Function
alert = function($ionicPopup,judul,teks){
   var alertPopup = $ionicPopup.alert({
     title: judul,
     template: teks
   });

   alertPopup.then(function(res) {
     //console.log('');
   });
 };
//End function

