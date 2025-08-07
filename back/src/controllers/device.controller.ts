import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import AppError from '../utils/AppError'

const prisma = new PrismaClient()

export const getDevices = async (_: Request, res: Response) => {
    try {
        const devices = await prisma.device.findMany({ include: { owner: true } })
        if (!devices || devices.length === 0) {
            throw new AppError(404, 'No devices found')
        }
        res.json(devices)
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message })
        }
        return res.status(500).json({ message: 'Failed to retrieve devices', error })
    }
}

export const getDeviceById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const device = await prisma.device.findUnique({ where: { id: id! }, include: { owner: true } })
        if (!device) {
            throw new AppError(404, 'Device not found')
        }
        res.json(device)
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message })
        }
        res.status(500).json({ message: 'Failed to retrieve device', error })
    }
}

export const createDevice = async (req: Request, res: Response) => {
    const { name, type, ownerId } = req.body
    try {
        const device = await prisma.device.create({ data: { name, type, ownerId } })
        if (!device) {
            throw new AppError(400, 'Failed to create device')
        }
        res.json(device)
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message })
        }
        console.error('Error creating device:', error)
        res.status(500).json({ message: 'Failed to create device', error })
    }
}

export const updateDevice = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, type, ownerId } = req.body
    try {
        let device = await prisma.device.findUnique({ where: { id: id! } })
        if (!device) {
            throw new AppError(404, 'Device not found')
        }
        device = await prisma.device.update({ where: { id: id! }, data: { name, type, ownerId } })
        res.json(device)
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message })
        }
        res.status(500).json({ message: 'Failed to update device', error })
    }
}

export const deleteDevice = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const device = await prisma.device.findUnique({ where: { id: id! } })
        if (!device) {
            throw new AppError(404, 'Device not found')
        }
        await prisma.device.delete({ where: { id: id! } })
        res.status(204).send()
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message })
        }
        return res.status(500).json({ message: 'Failed to find device', error })
    }

}
