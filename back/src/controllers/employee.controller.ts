import { PrismaClient } from '@prisma/client'
import type { Request, Response } from 'express'
import AppError from '../utils/AppError'

const prisma = new PrismaClient()

export const getEmployees = async (_: Request, res: Response) => {
    try {
        const employees = await prisma.employee.findMany({ include: { devices: true } })
        if (!employees || employees.length === 0) {
            return res.status(404).json({ error: 'No employees found' })
        }
        res.json(employees)
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve employees', error })
    }
}

export const getEmployeeById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const employee = await prisma.employee.findUnique({ where: { id: Number(id) }, include: { devices: true } })
        if (!employee) {
            throw new AppError(404, 'Employee not found')
        }
        res.json(employee)
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message })
        }
        res.status(500).json({ message: 'Failed to retrieve employee', error })
    }
}

export const createEmployee = async (req: Request, res: Response) => {
    const { name, role } = req.body
    try {
        const employee = await prisma.employee.create({ data: { name, role } })
        res.json(employee)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create employee', error })
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, role } = req.body
    if (!id || !name || !role) {
        return res.status(400).json({ error: 'Employee ID, name, and role are required' })
    }
    try {
        let employee = await prisma.employee.findUnique({ where: { id: Number(id) } })
        if (!employee) {
            throw new AppError(404, 'Employee not found')
        }
        employee = await prisma.employee.update({ where: { id: Number(id) }, data: { name, role } })
        res.json(employee)
    } catch (error) {
        res.status(500).json({ message: 'Failed to update employee', error })
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ error: 'Employee ID is required' })
    }
    try {
        const employee = await prisma.employee.findUnique({ where: { id: Number(id) } })
        if (!employee) {
            throw new Error('Employee not found')
        }
        await prisma.employee.delete({ where: { id: Number(id) } })
        res.json({ message: 'Employee deleted successfully' })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete employee', error })
    }
}
