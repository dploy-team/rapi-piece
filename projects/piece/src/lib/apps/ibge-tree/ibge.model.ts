export class RegiaoIbge {
  id: number;
  sigla: string;
  nome: string;
  estados: EstadoIbge[];
}

export class EstadoIbge {
  id: number;
  sigla: string;
  nome: string;
  regiao: RegiaoIbge;
  mesorregioes: MesorregiaoIbge[];
}

export class MesorregiaoIbge {
  id: number;
  nome: string;
  estado: EstadoIbge;
  microrregioes: MicrorregiaoIbge[];
}

export class MicrorregiaoIbge {
  id: number;
  nome: string;
  mesorregiao: MesorregiaoIbge;
  municipios: MunicipioIbge[];
}

export class MunicipioIbge {
  id: number;
  nome: string;
  microrregiao: MicrorregiaoIbge;
}
