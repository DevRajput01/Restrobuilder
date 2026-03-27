// import { Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import { PrismaClient } from '@prisma/client';
// import { generateToken } from '../lib/auth';

// const prisma = new PrismaClient();

// export const signup = async (req: Request, res: Response) => {
//   try {
//     const { email, password, name } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: { email, name, password: hashedPassword },
//     });

//     const token = generateToken(user.id);
//     res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
//   } catch (error) {
//     res.status(400).json({ error: "User already exists or invalid data" });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   const token = generateToken(user.id);
//   res.json({ token, user: { id: user.id, role: user.role } });
// };


import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../lib/auth';

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    const token = generateToken(user.id);
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: "User already exists or invalid data" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = generateToken(user.id);
  res.json({ token, user: { id: user.id, role: user.role } });
};