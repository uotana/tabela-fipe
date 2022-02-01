let marcaEscolhida = null;
let modeloEscolhido = null;
let anoEscolhido = null;

const dropdownMarcas = document.querySelector('#marcas');
const dropdownModelos = document.querySelector('#modelos');
const dropdownAnos = document.querySelector('#anos');
const valorFipe = document.querySelector('#valor');
const buscarBtn = document.querySelector('input[type="button"]');

const buscarMarcasNaApi = async () => {
  let marcas;
    await fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
        .then(response => response.json())
        .then(response => marcas = response)
        .catch(err => err);
    return marcas;
};

const buscarModelosNaApi = async () => {
  let modelos;
    await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaEscolhida}/modelos`)
        .then(response => response.json())
        .then(response => modelos = response)
        .catch(err => err);
    return modelos;
};


const buscarAnosNaApi = async () => {
  let anos;
    await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaEscolhida}/modelos/${modeloEscolhido}/anos`)
        .then(response => response.json())
        .then(response => anos = response)
        .catch(err => err);
    return anos;
};

const buscarValorNaApi = async () => {
  let valor;
    await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaEscolhida}/modelos/${modeloEscolhido}/anos/${anoEscolhido}`)
        .then(response => response.json())
        .then(response => valor = response)
        .catch(err => err);
    return valor;
};

const atualizarMarcaEscolhida = () => {
  marcaEscolhida = dropdownMarcas.options[dropdownMarcas.selectedIndex].value;
}

const atualizarModeloEscolhido = () => {
  modeloEscolhido = dropdownModelos.options[dropdownModelos.selectedIndex].value;
}

const atualizarAnoEscolhido = () => {
  anoEscolhido = dropdownAnos.options[dropdownAnos.selectedIndex].value;
}

dropdownMarcas.addEventListener('click', async () => {
  const marcas = await buscarMarcasNaApi();
  marcas.forEach(marca => {
    dropdownMarcas.innerHTML = dropdownMarcas.innerHTML + 
    `<option value="${marca.codigo}">${marca.nome}</option>`;
  });
})

dropdownModelos.addEventListener('click', async () => {
  const modelos = await buscarModelosNaApi(marcaEscolhida);
  modelos.modelos.forEach(modelo => {
    dropdownModelos.innerHTML = dropdownModelos.innerHTML + 
    `<option value="${modelo.codigo}">${modelo.nome}</option>`;
  });
})

dropdownAnos.addEventListener('click', async () => {
  const anos = await buscarAnosNaApi(marcaEscolhida, modeloEscolhido);
  anos.forEach(ano => {
    dropdownAnos.innerHTML = dropdownAnos.innerHTML + 
    `<option value="${ano.codigo}">${ano.nome}</option>`;
  });
})

buscarBtn.addEventListener('click', async ()=>{
  const valor = await buscarValorNaApi(marcaEscolhida, modeloEscolhido, anoEscolhido);
  valorFipe.value = valor.Valor;
})