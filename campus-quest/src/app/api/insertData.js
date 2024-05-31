


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, age } = req.body;

    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();

      const db = client.db('mydatabase');
      const collection = db.collection('mycollection');

      // Insert data
      const result = await collection.insertOne({ name, age });

      if (result.insertedCount === 1) {
        res.status(201).json({ message: 'Data inserted successfully' });
      } else {
        res.status(500).json({ message: 'Failed to insert data' });
      }
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Failed to insert data' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
