const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";
//const uri = "mongodb://35.243.215.124:27017/?maxPoolSize=20&w=majority";


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
    var success = (result && result.modifiedCount > 0);
    return success;
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
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};


/*
exports.updateProperty = async (diagramId, elementBusinessId, property) => {
  const client = new MongoClient(uri);
  try {

    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("plandraw");
    const collection = database.collection("diagram");

    // db.diagram.find({"_id" : ObjectId("61a41f426227dec623b728be"), "elements": {$elemMatch: {"data.businessObject.id": "java-service-estoque", "properties": {$elemMatch: {"name": "Owner"}} } } }, {"elements.$": 1}).pretty()


    const query = { _id: ObjectId(diagramId) };
    const options = null;

    var diagram = await collection.findOne(query);
    if(!diagram) {
      return null;
    }

    var propertyUpdated = updateProperty(diagram, elementBusinessId, property)
    
    var r = await collection.updateMany(
      query,
      {$set: diagram},
      function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      }
    )

    console.log("a");

    
    const query = { _id: ObjectId(diagramId) };
    const options = {
      sort: { name: 1 },
      projection: { _id: 1, name: 1}
    };

    const cursor = await collection.find(query, options);
    const allValues = await cursor.toArray();
    return allValues;

    return '';
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  } 
}*/