import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import UsuarioModel from '../models/usuario.model';

export const getAdmin = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id.startsWith('adm1-')) {
        return res.status(400).json({ message: 'ID no válido para un administrador' });
    }

    try {
        const usuario = await UsuarioModel.findByPk(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Administrador no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener administrador' });
    }
    return;
};

export const createAdmin = async (req: Request, res: Response) => {
    const { correo_electronico, contrasena } = req.body;

    const id_usuario = 'adm1-' + uuidv4();

    try {
        const usuario = await UsuarioModel.create({ id_usuario, correo_electronico, contrasena, puesto: 'administrador' });

        res.cookie('userId', usuario.id_usuario, { httpOnly: true });

        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear administrador', error });
    }
};