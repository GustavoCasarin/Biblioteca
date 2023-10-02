import { Livro } from '../models/Livro.js';
import { Log } from '../models/Log.js'
import { Usuario } from '../models/Usuario.js'

export const LivroIndex = async (req, res) => {
    try {
      const livros = await Livro.findAll({
        include: [
          {
            model: Usuario,
            attributes: ['nome']
          }
        ]
      });
      res.status(200).json(livros)
    } catch (error) {
      res.status(400).send(error)
    }
  }

  export const LivroCreate = async (req, res) => {
    const { nome, genero, pagina, usuario_id } = req.body
  
    if (!nome || !genero|| !pagina|| !usuario_id) {
      res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
      return
    }
  
    try {
      const livro = await Livro.create({
        nome, genero, pagina, usuario_id
      });
      res.status(200).json(livro)
    } catch (error) {
      res.status(400).send(error)
    }
  }

  export const LivroUpdate = async (req, res) => {
    const { id } = req.params;
    const { nome, genero, pagina, usuario_id } = req.body;
  
    if (!nome || !genero || !pagina || !usuario_id) {
      res.status(400).json({
        id: 0,
        msg: "OPS. informe nome, genero, pagina do produto",
      });
      return;
    }
    
    try {
      const livro = await Livro.findByPk(id);
      
      if (!livro) {
        res.status(404).json({ id: 0, msg: "Livro não encontrado" });
        return;
      }
      
      await livro.update({
        nome, genero, pagina, usuario_id
      });
      
      res.status(200).json({ id, msg: "Ok! Alterado com sucesso" });
    } catch (error) {
      res.status(400).json({ id: 0, msg: "Erro: " + error.message });
    }
  };

  export const LivroDestroy = async (req, res) => {
    const { id } = req.params
    const user_logado_id = req.user_logado_id
  
    try {
      await Livro.destroy({ where: { id } });
  
      await Log.create({
        descricao: "Exclusão do Livro " + id,
        usuario_id: user_logado_id
      })
  
      res.status(200).json({ msg: "Ok! Removido com Sucesso" })
    } catch (error) {
      res.status(400).send(error)
    }
  }