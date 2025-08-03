import { Router } from 'express'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById } from '../controllers/employee.controller'
import { checkId } from '../middleware/checkId'

const router: Router = Router()


router.get('/', getEmployees)
router.get('/:id', checkId, getEmployeeById)
router.post('/', createEmployee)
router.put('/:id', checkId, updateEmployee)
router.delete('/:id', checkId, deleteEmployee)

export default router
