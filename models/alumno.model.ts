import { PersonaModel } from './persona.model';

export class AlumnoModel extends PersonaModel {
  constructor(
    public legajo: number,
    nombre: string,
    apellido: string,
    email: string,
    public fechaAlta: string,
    public modificacion: string,
    public isActive: boolean
  ) {
    super(nombre, apellido, email);
    this.validate();
  }

  private validate(): void {
    if (!this.legajo || typeof this.legajo !== 'number') throw new Error('Legajo invalido');
    if (!this.nombre || typeof this.nombre !== 'string') throw new Error('Nombre invalido');
    if (!this.apellido || typeof this.apellido !== 'string') throw new Error('Apellido invalido');
    if (!this.email || typeof this.email !== 'string' || !this.email.includes('@')) throw new Error('Email invalido');
    if (!this.fechaAlta || typeof this.fechaAlta !== 'string') throw new Error('Fecha de alta invalida');
    if (!this.modificacion || typeof this.modificacion !== 'string') throw new Error('Fecha de modificacion invalida');
    if (typeof this.isActive !== 'boolean') throw new Error('Estado activo invalido');
  }

  public getLegajo(): number {
    return this.legajo;
  }

  public getAllAttributes(): object {
    return {
      legajo: this.legajo,
      ...super.getAllAttributes(),
      fechaAlta: this.fechaAlta,
      modificacion: this.modificacion,
      isActive: this.isActive
    };
  }
}
