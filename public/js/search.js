     // Inicializar o mapa
     var map = L.map('map').setView([
      -23.55052, -46.633308
    ], 10); // Definir a visualização do mapa para São Paulo, Brasil Adicionar camada de mapa base
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
    ).addTo(map);
    // Adicionar marcadores dos lugares
    var places = [{% for place in places %}{
          name: "{{ place.name }}",
          lat: {{ place.lat }},
          lng: {{ place.lng }},
          detailsUrl: "{{ place.detailsUrl }}"
        },{% endfor %}];
    places.forEach(function (place) {
      L
        .marker([place.lat, place.lng])
        .addTo(map)
        .bindPopup(`<b>${
          place.name
        }</b><br/><a href="${
          place.detailsUrl
        }">Detalhes</a>`);
    });