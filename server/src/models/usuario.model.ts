import { Model, DataTypes, ModelOptions } from 'sequelize';
import sequelize from '../db';

interface UsuarioAttributes {
    id_usuario: string;
    correo_electronico: string;
    contrasena: string;
    puesto: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

interface UsuarioInstance extends Model<UsuarioAttributes>, UsuarioAttributes { }

const UsuarioModel = sequelize.define<UsuarioInstance>('Usuario', {
    id_usuario: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    contrasena: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    puesto: {
        type: DataTypes.ENUM('enfermero', 'cuidador', 'paciente', 'administrador'),
        allowNull: false
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize,
    tableName: 'usuario',
    timestamps: false
} as ModelOptions<UsuarioInstance>);

export default UsuarioModel;