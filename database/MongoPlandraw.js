const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_CONNECTION;


exports.addDiagram = async (diagram) => {
  const client = new MongoClient(uri);
  try {

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("plandraw");
    const collection = database.collection("diagram");
    const result = await collection.insertOne(diagram);

    return result.insertedId;
  } catch(e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

exports.updateDiagram = async (diagram, diagramId) => {
  const client = new MongoClient(uri);
  try {

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("plandraw");
    const collection = database.collection("diagram");

    const filter = { _id: ObjectId(diagramId) };
    const options = {}

    const result = await collection.replaceOne(filter, diagram);
    console.log(result);
    var success = (result && result.matchedCount > 0);
    return success;
  } catch(e) {
      console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};



exports.getDiagramById = async (id) => {
  const client = new MongoClient(uri);
  try {

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("plandraw");
    const collection = database.collection("diagram");

    const query = { _id: ObjectId(id) };
    const options = null;

    var result = await collection.findOne(query);

    return result;
  } catch(e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

exports.getAllById = async () => {
  const client = new MongoClient(uri);
  try {

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("plandraw");
    const collection = database.collection("diagram");

    const query = {};
    const options = {
      sort: { name: 1 },
      projection: { _id: 1, name: 1}
    };

    const cursor = await collection.find(query, options);
    const allValues = await cursor.toArray();
    return allValues;
  } catch(e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

/*  -------------------------  */

exports.getSiteAccessCount = async (id) => {
  const client = new MongoClient(uri);
  try {

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("plandraw");
    const collection = database.collection("site");

    const query = { id: id };
    const options = null;

    var result = await collection.findOne(query);

    return result;
  } catch(e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

exports.createUpdateSiteAccessCount = async (accessCountObj) => {
  const client = new MongoClient(uri);
  try {

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("plandraw");
    const collection = database.collection("site");

    const filter = { id: accessCountObj.id };
    const options = {upsert: true}

    const createUpdate = {
      $set: accessCountObj
    }

    const result = await collection.updateOne(filter, createUpdate, options);

    console.log(result);
    var success = (result && (result.matchedCount > 0 || result.upsertedCount > 0));
    return success;
  } catch(e) {
      console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};