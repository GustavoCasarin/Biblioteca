import bcrypt from 'bcrypt'

import { Usuario } from '../models/Usuario.js'
import { Log } from "../models/Log.js";

function validaSenha(senha) {

  const mensa = []

  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  for (const letra of senha) {
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}


export const usuarioIndex = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const usuarioCreate = async (req, res) => {
  const { nome, email, senha, nivelAcesso} = req.body

  if (!nome || !email || !senha || !nivelAcesso) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  const mensaValidacao = validaSenha(senha)
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao })
    return
  }  

  try {
    const validaEmail = await Usuario.findOne({where: {email}})
    if (validaEmail) {
      res.status(400).json({id:0, msg:"Este email já está em uso, por favor use outro!"})
    return
  }
    const usuario = await Usuario.create({
      nome, email, senha, nivelAcesso
    });
    res.status(201).json(usuario)
  } catch (error) {
    res.status(400).send(error)
  }
}

