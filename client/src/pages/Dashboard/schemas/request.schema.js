import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    apellido_paterno: Yup.string().required('El apellido paterno es requerido'),
    apellido_materno: Yup.string().required('El apellido materno es requerido'),
    genero: Yup.string().required('El género es requerido'),
    puesto: Yup.string().required('El tipo de usuario es requerido'),
    correo_electronico: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
    rfc: Yup.string().max(13, 'El RFC no puede tener más de 13 caracteres').required('El RFC es requerido'),
    domicilio: Yup.string().required('La dirección es requerida'),
    fecha_nacimiento: Yup.date().required('La fecha de nacimiento es requerida').nullable(),
    salario_hora: Yup.number().required('El salario_hora es requerido'),
    phoneNumbers: Yup.array().of(Yup.string().required('El número de teléfono es requerido')),
    experiencias_previas: Yup.string(),
    detalles_ultimo_trabajo: Yup.string()
});

export default validationSchema;