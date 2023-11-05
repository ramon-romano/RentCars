DESAFIO ESTÁGIO RENTCARS - CRIADO POR RAMON ROMANO 

O projeto consiste em um aplicativo CRUD (Create, Read, Update, Delete) desenvolvido em Node.js, que permitirá a gestão de veículos em uma locadora de carros. Cada veículo terá informações detalhadas, incluindo ID, locadora, modelo, marca, ano, motor, número de portas, tipo de câmbio, presença de ar-condicionado e datas de criação e atualização.


SETUP DO AMBIENTE:
Node.js
Express
MySQL
Sequelize
VS Code


DOCKER
Neste código não foi utilizado o Docker, já que não estava funcionando em minnha maquina, e como me disseram que não tinha problema, fiz sem a utilização do Docker.

INICIO
Para se iniciar o app é necessário que no terminal seja digitado:

npm init

npm install sequelize express mysql2 nodemon

Logo após isto você dara start no app utilizando:

npm start

Logo após você dar este comando adicione duas barras na frente deste comando: connection.sync({force: true}), este comando ele criara a tabela no banco de dados, após o npm start ter sido concluido, ele não é mais necessário.
Assim o app começara a funcionar.

SOBRE
Neste código foram utilizados como front-end o, HTML, CSS e JavaScript, e o Home da pagina web é o index.html, você acessará ele na Web utilizando o URL http://localhost:3000, assim você estará na pagina inicial do app.

CRIAR/REGISTRAR 
Na pagina Web, você entra em "Registrar Veiculo", assim você sera direcionado para o URL  http://localhost:3000/Criar, onde poderá fazer o cadastro dos carros, e o código ira lhe informar caso tenha repetido alguma informação, e assim que acabar você registrar o veiculo será notificado.

LISTAGEM
Na pagina principal você tera o botão "Listagem de Veiculos", ao clicar você entrara no URL  http://localhost:3000/CarroListagem, que é onde você podera ver todos os carros no qual estão armazenados no banco de dados, ou apenas o qual você registrou com o ID,colocando o ID e clicar em "Procurar", ele irá lhe mostrar os dados apenas do ID inserido.

ATUALIZAÇÃO
Na pagina inicial tem o botão "Atualizar Veiculo", clicando você ira para a URL http://localhost:3000/Atualizar, que tem uma interface parecida com o Cria/Registrar, porem ele identifica o ID colocado, e os dados que você alterar ali, eles seram mudados também no banco de dados, e aparecerá uma notificação informando que foi atualizado os dados.

DELETAR
E por ultimo, tem o botão "Deletar Veiculo", que você clicando nele será levado para a URL http://localhost:3000/Deletar, lá você apenas colocara o ID que deseja deletar com todos os dados, e clicar no botão, ira aparecer uma notificação, dizendo que o veiculo foi deletado com sucesso.