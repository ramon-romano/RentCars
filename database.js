const sequelize = require('sequelize')
const Sequelize = sequelize.Sequelize

const connection = new Sequelize(
  'testing',
  'root',
  'ANSKk08aPEDbFjDO', 
  {
    dialect: "mysql",
    host: 'localhost',
    port: 3307
  }
)

const Veiculos = connection.define('veiculos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  locadora: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  modelo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  marca: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  motor: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  numero_portas: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tipo_cambio: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ar_condicionado: {
    type: Sequelize.BOOLEAN,
  },
});

//connection.sync({force: true})
Veiculos.sync()
.then(function() {
  console.log('Banco de dados sincronizado');
})
.catch(function(error) {
  console.error(error);
}); 

module.exports = Veiculos;