export enum ETipoUsuario {
  controlador = 1,
  condomino = 2,
  sindico = 3,
  administrador = 4,
  super_admin = 5
}

export const lista_tipo_usuario_enum = [
  { value: ETipoUsuario.controlador, label: 'Controlador', ordem: 1 },
  { value: ETipoUsuario.condomino, label: 'Condomino', ordem: 2 },
  { value: ETipoUsuario.sindico, label: 'Síndico', ordem: 3 },
  { value: ETipoUsuario.administrador, label: 'Administrador', ordem: 4 },
  { value: ETipoUsuario.super_admin, label: 'SuperAdmin', ordem: 5 }
]
