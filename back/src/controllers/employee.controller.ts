import { PrismaClient } from '@prisma/client'
import type { Request, Response } from 'express'
import AppError from '../utils/AppError'

const prisma = new PrismaClient()

export const getEmployees = async (_: Request, res: Response) => {
    try {
        const employees = await prisma.employee.findMany({ include: { devices: true } })
        if (!employees || employees.length === 0) {
            throw new AppError(404, 'No employees found')
        }
        res.json(employees)
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message })
        }
        res.status(500).json({ message: 'Failed to retrieve employees', error })
    }
}

export const getEmployeeById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const employee = await prisma.employee.findUnique({ where: { id: id! }, include: { devices: true } })
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
    try {
        let employee = await prisma.employee.findUnique({ where: { id: id! } })
        if (!employee) {
            throw new AppError(404, 'Employee not found')
        }
        employee = await prisma.employee.update({ where: { id: id! }, data: { name, role } })
        res.json(employee)
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message })
        }
        res.status(500).json({ message: 'Failed to update employee', error })
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const employee = await prisma.employee.findUnique({ where: { id: id! } })
        if (!employee) {
            throw new AppError(404, 'Employee not found')
        }
        await prisma.employee.delete({ where: { id: id! } })
        res.json({ message: 'Employee deleted successfully' })
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.status).json({ message: error.message })
        }
        return res.status(500).json({ message: 'Failed to delete employee', error })
    }
}
