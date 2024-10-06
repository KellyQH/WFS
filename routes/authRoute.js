import { Router } from "express"
import { login, register, logout} from "../controllers/authController.js"

const router = new Router()


router.post("/signup", register)
router.post("/login", login)
router.post("/logout", logout)

export default router