import { Router } from "express"
import { usuarioCreate, usuarioIndex } from "./controllers/usuarioController.js"
import { loginUsuario } from "./controllers/loginController.js"
import { LivroCreate, LivroDestroy, LivroIndex, LivroUpdate } from "./controllers/livroController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"


const router = Router()
router.get('/usuarios', usuarioIndex)
      .post('/usuarios', usuarioCreate)

router.get('/livros', LivroIndex)
      .post('/livros',verificaLogin, LivroCreate)
      .put('/livros/:id', LivroUpdate)
      .delete('/livros/:id',verificaLogin, LivroDestroy)

router.get('/login', loginUsuario)

export default router