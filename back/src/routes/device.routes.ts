import { Router } from 'express'
import { getDevices, createDevice, updateDevice, deleteDevice, getDeviceById } from '../controllers/device.controller'
import { checkId, checkDeviceSchema } from '../middleware'

const router: Router = Router()

router.get('/', getDevices)
router.get('/:id', checkId, getDeviceById)
router.post('/', checkDeviceSchema, createDevice)
router.put('/:id', checkId, checkDeviceSchema, updateDevice)
router.delete('/:id', checkId, deleteDevice)

export default router
