export class TransactionItem {
  constructor(
    public id: number,
    public customerId: string,
    public accountNumber: string,
    public description: string,
    public isHidden?: boolean
  ) {}
}
