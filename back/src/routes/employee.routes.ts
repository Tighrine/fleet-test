import { Router } from 'express'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById } from '../controllers/employee.controller'
import { checkId, checkEmployeeSchema } from '../middleware'

const router: Router = Router()


router.get('/', getEmployees)
router.get('/:id', checkId, getEmployeeById)
router.post('/', checkEmployeeSchema, createEmployee)
router.put('/:id', checkId, checkEmployeeSchema, updateEmployee)
router.delete('/:id', checkId, deleteEmployee)

export default router
