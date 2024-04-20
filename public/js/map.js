// Coordenadas para o centro do mapa
var centroMapa = [-23.5505, -46.6333]; // São Paulo, Brasil

// Criar o mapa
var mapa = L.map('map').setView(centroMapa, 10);

// Adicionar camada do OpenStreetMap ao mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mapa);

// Array de pontos a serem exibidos no mapa
var pontos = [
  { nome: 'Local 1', coordenadas: [-23.5475, -46.6361] },
  { nome: 'Local 2', coordenadas: [-23.555, -46.625] },
  { nome: 'Local 3', coordenadas: [-23.562, -46.645] },
];

// Adicionar marcadores para cada ponto no mapa
pontos.forEach(function (ponto) {
  var marcador = L.marker(ponto.coordenadas).addTo(mapa);
  marcador.bindPopup(ponto.nome);
});
