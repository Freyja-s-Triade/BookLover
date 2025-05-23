import sequelize from '../models/sequelizeClient.js';
import '../models/index.js';

(async () => {
  console.log('Syncing database');
  await sequelize.sync({ force: true });
  
  await sequelize.close();

  console.log('\n✅ Database synced\n');
})();

