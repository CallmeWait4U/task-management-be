import { IQuery } from '@nestjs/cqrs';

export class GetDetailTaskQuery implements IQuery {
  idUser: string;
  id: string;

  constructor(data: GetDetailTaskQuery) {
    Object.assign(this, data);
  }
}
