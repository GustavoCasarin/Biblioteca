import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv'
dotenv.config()

import { Usuario } from "../models/Usuario.js";
import { Log } from '../models/Log.js';

export const loginUsuario = async (req, res) => { 
  const { nome, senha } = req.body;
  const usuario = await Usuario.findOne({ where: { nome } });


  if (!nome || !bcrypt.compareSync(senha, usuario.senha)) {

    return res.status(401).json({ error: 'Dados Incorretos' });
  } else {

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome, nivelAcesso: usuario.nivelAcesso }, process.env.JWT_KEY, {
      expiresIn: "1h"
    });

    res.status(200).json({ msg: "Liberado", token });

    await Log.create({
      descricao: "Login realizado",
      usuario_id: usuario.id
      })
  }
};