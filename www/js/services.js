angular.module('starter.services', [])

//Camera
.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
      var q = $q.defer();
      
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}])
//ENd camera

//Service
.service('tagihan',function(){
  var pelanggan = [];
  var kirim = function(newObj){
    pelanggan.push(newObj);
  };
  var ambil = function(){
    return pelanggan;
  };
  var kosong = function(){
    pelanggan = [];
  }
  return {
    kirim:kirim,
    ambil:ambil,
    kosong:kosong
  };
})
//End service
