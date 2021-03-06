geocodificadorModulo = (function () {
  var geocodificador // Geocodificador que dada una dirección devuelve una coordenada

  // Promise para resolver direcciones
  function resolverDireccion(direccion){
    return new Promise(function(resolve, reject){
      const circulo = new google.maps.Circle( {
        center: posicionCentral,
        radius: 20000
      });

      const request = {
        address: direccion,
        bounds: circulo.getBounds()
      }

      geocodificador.geocode(request,function(response){
        const place = response[0]
        const ubicacion = place.geometry.location
        resolve({
          direccion: direccion,
          ubicacion: ubicacion
        })
      })

    })

  }

    // Permite obtener las coordenadas y las usa con la función llamada por parámtero
  function usaDireccion (direccion, funcionALlamar) {
        const circulo = new google.maps.Circle( {
          center: posicionCentral,
          radius: 20000
        });

        const request = {
          address: direccion,
          bounds: circulo.getBounds()
        }

        geocodificador.geocode(request,function(response){
          const place = response[0]
          funcionALlamar(direccion,place.geometry.location)
        })

        /* Completar la función usaDireccion(dirección,funcionALlamar)
     para que se obtengan las coordenadas a partir de la dirección pasada por parámetro
     y que llame a la función pasada por parámetro con los siguientes parámetros
     dirección: la dirección pasada por parámetro
     coordenada: la ubicación de tipo google.maps.LatLng */
  }

    // Inicializo el geocoder que obtiene las corrdenadas a partir de una dirección
    // La variable dirección es igual al texto ingresado por el usuario
    // Llama a la función usaDirecciin para agregarla a los listados y mostrarlo en el mapa
  function inicializar () {
    var that = this
    geocodificador = new google.maps.Geocoder()

        // cuando se presiona la tecla enter en el campo direccion, se agrega la dirección y se muestra en el mapa
    document.querySelector('#direccion').addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode
      if (key === 13) { // 13 is enter
                // code for enter
        var direccion = document.getElementById('direccion').value
        that.usaDireccion(direccion, direccionesModulo.agregarDireccionYMostrarEnMapa)
      }
    })
  }

  return {
    usaDireccion,
    inicializar,
    resolverDireccion
  }
})()
