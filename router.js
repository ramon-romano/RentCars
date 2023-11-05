const path = require('path');
const express = require('express');
const router = express.Router();
const server = require('./server');
const bodyparser = require('body-parser')
const Veiculos = require('./database');


//CRIAR O CARRO NO APP
router.get('/Criar', (req, res) => {
  res.sendFile(__dirname + "/frontend/Criar.html");
});
router.post('/Criar', (req, res) => {
  const { id, locadora, modelo, marca, ano, motor, numero_portas, tipo_cambio, ar_condicionado } = req.body;

  Veiculos.findOne({ where: { id: id } })
    .then(function (existingVeiculo) {
      if (existingVeiculo) {
        // Se o veículo com o mesmo ID já existe, envie uma mensagem de erro com um botão para voltar à página de cadastro
        return res.status(400).send(`ID já existe. Por favor, <a href="/Criar">retorne à página de cadastro</a> e insira um ID diferente.`);
      } else {
        // Verifique se o ID é um número inteiro
        if (!/^\d+$/.test(id)) {
          // Se o ID não for um número inteiro, envie uma mensagem de erro com um botão para voltar à página de cadastro
          return res.status(400).send(`ID deve ser um número inteiro. Por favor, <a href="/Criar">insira um ID válido</a>.`);
        }

        let arCondicionado = parseInt(ar_condicionado);
        if (isNaN(arCondicionado)) {

        }
        Veiculos.create({
          id,
          locadora,
          modelo,
          marca,
          ano,
          motor,
          numero_portas,
          tipo_cambio,
          ar_condicionado: arCondicionado
        })
          .then(function () {
            res.status(200).send('Veículo atualizado com sucesso');
          })
          .catch(function (error) {
            console.error(error);
            res.status(500).send('Erro ao criar o veículo.');
          });
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Erro ao verificar o ID.');
    });
});


  //LISTAGEM DO APP
  router.get('/CarroListagem', (req, res) => {
    const htmlAPath = path.resolve(__dirname + "/frontend/botãoListagem.html");
  res.sendFile(htmlAPath);
  });
  router.get('/Listagem', (req, res) => {
    Veiculos.findAll({ attributes: ['id', 'locadora','modelo','marca','ano','motor','numero_portas','tipo_cambio','ar_condicionado'] })
    .then(function(veiculos) {
      const veiculosList = veiculos.map(veiculo => {
        return `
          <div>
            <p>Veículo ID: ${veiculo.id}</p>
            <p>Locadora: ${veiculo.locadora}</p>
            <p>Modelo: ${veiculo.modelo}</p>
            <p>Marca: ${veiculo.marca}</p>
            <p>Ano: ${veiculo.ano}</p>
            <p>Motor: ${veiculo.motor}</p>
            <p>Numero de Portas: ${veiculo.numero_portas}</p>
            <p>Tipo de Câmbio: ${veiculo.tipo_cambio}</p>
            <p>Ar Condicionado: ${veiculo.ar_condicionado}</p>
          </div>
        `;
      });
  
      const backButton = `<a href="/">Voltar à Interface Principal</a>`;
  
      res.send(veiculosList.join('') + backButton);
    });
  });
  
  router.get('/Listagem:id', (req, res) => {
    const id = req.params.id;
    Veiculos.findOne({ where: { id: id } })
      .then(function (veiculo) {
        if (veiculo) {
          const veiculoDetails = `
            <p>Veículo ID: ${veiculo.id}</p>
            <p>Locadora: ${veiculo.locadora}</p>
            <p>Modelo: ${veiculo.modelo}</p>
            <p>Marca: ${veiculo.marca}</p>
            <p>Ano: ${veiculo.ano}</p>
            <p>Motor: ${veiculo.motor}</p>
            <p>Numero de Portas: ${veiculo.numero_portas}</p>
            <p>Tipo de Câmbio: ${veiculo.tipo_cambio}</p>
            <p>Ar Condicionado: ${veiculo.ar_condicionado}</p>
          `;
  
          const backButton = `<a href="/">Voltar à Interface Principal</a>`;
  
          res.send(veiculoDetails + backButton);
        } else {
          const errorMessage = 'ID não encontrado. Por favor, insira um ID válido.';
          const backButton = '<a href="/">Voltar à Interface Principal</a>';
          res.status(404).send(errorMessage + backButton);
        }
      })
      .catch(function (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar os detalhes do veículo.');
      });
  });
  
//ATUALIZAR O APP
router.get('/Atualizar', (req, res) => {
  const htmlAPath = path.resolve(__dirname + "/frontend/Atualizar.html");
  res.sendFile(htmlAPath);
});

// Use req.params.id para obter o ID dinâmico
router.put('/Atualizar/:id', async (req, res) => {
  // Obtenha o valor do ID a partir dos parâmetros da solicitação
  const id = req.params.id;

  // Certifique-se de que o ID não seja undefined ou nulo
  if (id === undefined || id === null) {
    res.status(400).send('ID inválido na solicitação');
    return;
  }

  // Continue com a lógica de atualização usando o ID
  const { locadora, modelo, marca, ano, motor, numero_portas, tipo_cambio, ar_condicionado } = req.body;

  // Construa a condição com o ID
  const condition = { id: id };

  Veiculos.update(
    {
      locadora,
      modelo,
      marca,
      ano,
      motor,
      numero_portas,
      tipo_cambio,
      ar_condicionado
    },
    {
      where: condition
    }
  )
    .then(function (result) {
      if (result[0] === 1) {
        res.status(200).send('Veículo atualizado com sucesso');
      } else {
        res.status(404).send('Veículo não encontrado');
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar veículo');
    });
});


//DELETAR OS CARROS NO APP
router.get('/Deletar', (req, res) => {
  const htmlAPath = path.resolve(__dirname + "/frontend/Deletar.html");
res.sendFile(htmlAPath);
});

router.delete('/Deletar:id', (req, res) => {
  const { id } = req.params;

  Veiculos.destroy({
    where: {
      id: id
    }
  })
  .then(function() {
    res.send('Dados deletados com sucesso!');
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send('Erro ao deletar os dados');
  });
});


router.get('/', (req, res) => {
  const htmlPath = path.resolve(__dirname+ "/frontend/index.html");
  res.sendFile(htmlPath);
});

module.exports = router;