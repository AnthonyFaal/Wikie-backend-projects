const express = require('express');
const sequelize = require('./src/models/index');
const postRoutes = require('./src/routes/post.routes');

const app = express();

app.use(express.json());
app.use('/api', postRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 
