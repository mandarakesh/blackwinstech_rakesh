import express from "express";
import cors from "cors";
import joi from "joi";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

// to configure .env file
dotenv.config();

const app = express();
// use json to get allow data from the user
app.use(express.json());
// use cors for front end connection
app.use(cors());

// get mongo url from .env
const MONGO_URL = process.env.MONGO_URL;
// connecting to database
const client = new MongoClient(MONGO_URL);
async function DataBase() {
  await client.connect();
  return await client.db("Blackwinstech").collection("Contacts");
}

// create schema validation check
const validateSchema = joi.object({
  Name: joi.string().required("Name is required"),
  Phone_Number: joi
    .number()
    .required("Phone_Number is required")
    .max(9999999999, "Max length exceed")
    .min(5000000000, "Min Values required"),

  Address: joi.string().required("Address is required"),
  email: joi.string().required("email is required"),
  Created_At: joi.date().required("Created_At is required"),
});

// update schema validation check
const updatedValidateSchema = validateSchema.append({
  Contact_ID: joi.string().required("Contact_ID is required"),
});

//get api
app.get("/contacts", async (req, res) => {
  try {
    const data = await DataBase();
    const findByName = req.query.name;
    console.log(findByName);
    let contacts;
    //search based on name
    if (findByName !== undefined) {
      contacts = await data
        .find({ Name: { $regex: new RegExp(findByName, "i") } })
        .toArray();
    } else {
      //get all contacts
      contacts = await data.find({}).toArray();
    }
    console.log(contacts);
    const updated = contacts.map((item) => {
      const { _id, ...data } = item;
      return { ...data, Contact_ID: _id };
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//get contact by id
app.get("/contacts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await DataBase();
    const contact = await data.findOne({ _id: new ObjectId(id) });
    if (!contact) {
      return res.status(404).json({ message: "User not found" });
    }

    const { _id, ...dataValue } = contact;
    const updated = { ...dataValue, Contact_ID: _id };
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//create contact
app.post("/contacts", async (req, res) => {
  try {
    const body = req.body;
    const updatedData = {
      ...body,
      Created_At: new Date().toLocaleString(),
    };
    //validate contact
    const valdate = validateSchema.validate(updatedData);
    if (valdate.error) {
      const errorMessage = valdate.error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    const data = await DataBase();
    const contact = await data.insertOne(updatedData);
    const { insertedId } = contact;
    const { _id, ...updated } = updatedData;

    res.status(201).send({ Contact_ID: insertedId, ...updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//update contach based on id
app.put("/contacts/:id", async (req, res) => {
  const id = req.params.id;
  const updated = req.body;
  try {
    //validate contact
    const valdate = updatedValidateSchema.validate(updated);

    if (valdate.error) {
      const errorMessage = valdate.error.details[0].message;
      return res.status(400).json({ error: errorMessage });
    }
    const database = await DataBase();
    const contact = await database.updateOne(
      { _id: new ObjectId(id) },
      { $set: updated }
    );
    if (contact.matchedCount === 1) {
      res.send(updated);
    } else {
      res.status(400).send("Somthing went Wrong!");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

//delete contact based on id
app.delete("/contacts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const database = await DataBase();
    const contact = await database.deleteOne({ _id: new ObjectId(id) });
    if (!contact) {
      res.status(400).send("something went wrong,user not found");
    } else {
      res.send("Item deleted Successfully");
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 404 error handling
app.use((req, res, next) => {
  res.status(404).send("Sorry, we could not find that Path!");
});

//500 error handling
app.use((req, res, next) => {
  res.status(500).send("Something gone Wrong!");
});

app.listen(5000, console.log("Port is running on 5000"));
