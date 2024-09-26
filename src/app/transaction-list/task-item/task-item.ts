export class TaskItem {
  constructor(
    public id: number,
    public customerId: string,
    public accountNumber: string,
    public description: string,
    public isHidden?: boolean
  ) {}
}
