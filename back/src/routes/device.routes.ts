import { Router } from 'express'
import { getDevices, createDevice, updateDevice, deleteDevice, getDeviceById } from '../controllers/device.controller'
import { checkId } from '../middleware/checkId'

const router: Router = Router()

router.get('/', getDevices)
router.get('/:id', checkId, getDeviceById)
router.post('/', createDevice)
router.put('/:id', checkId, updateDevice)
router.delete('/:id', checkId, deleteDevice)

export default router
