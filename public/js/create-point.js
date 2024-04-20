function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector('select[name=city');
  const stateInput = document.querySelector('input[name=state');

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = '';
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector('select[name=uf]').addEventListener('change', getCities);

///items de coleta

///pegar todos os LI's
const itemsToCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('input[name=items]');

//colocar os items no input hiden
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  //add ou remover class em js
  itemLi.classList.toggle('selected');

  const itemId = itemLi.dataset.id;
  console.log('ITEM ID:', itemId);

  //verificar se tem item selecionado
  //se sim, pegar itens selecionanado
  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  //   console.log(alreadySelected >= 0);

  //se ja tiver selecionado,
  if (alreadySelected >= 0) {
    //tirar da seleçao
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId; //false
      return itemIsDifferent;
    });

    console.log(filteredItems);

    selectedItems = filteredItems;
  } else {
    //se nao tiver, add a selecao
    selectedItems.push(itemId);
  }

  console.log('SelectedItem', selectedItems);

  //atualizar o campo escondido com os dados/itens  (input hiden) selecionados
  collectedItems.value = selectedItems;
}
