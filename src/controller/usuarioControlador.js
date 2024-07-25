const { getDB } = require('../config/conexion');
const Usuario = require('./../model/usuario');
const { ObjectId } = require('mongodb');

exports.getAllUsers = async (req, res) => {
  try {
    const db = getDB();
    const usuarios = await db.collection('Usuarios').find().toArray();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    const usuario = await db.collection('Usuarios').findOne({ _id: new ObjectId(id) });
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario not found' });
    }
    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const db = getDB();
    const usuario = new Usuario(name, email, password);
    await db.collection('Usuarios').insertOne(usuario);
    res.status(201).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const db = getDB();
    const updatedUsuario = await db.collection('Usuarios').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name, email, password } },
      { returnOriginal: false }
    );
    res.json(updatedUsuario.value);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    await db.collection('Usuarios').deleteOne({ _id: new ObjectId(id) });
    res.json({ msg: 'Usuario deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
