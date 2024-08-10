const db = require('./db/connection');

const saveMessageToDatabase = async (message) => {
  try {
    const query = 'INSERT INTO messages (content, sender, timestamp) VALUES ($1, $2, $3) RETURNING *';
    const values = [message.content, message.sender, message.timestamp];
    const result = await db.query(query, values);
    console.log('Message saved:', result.rows[0]);
  } catch (error) {
    console.error('Error saving message to database:', error);
  }
};

module.exports = { saveMessageToDatabase };