import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Cart extends Model<Cart> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    items: string;
    
    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    final_price: number;
    
    @Column({
        type: DataType.FLOAT,
        allowNull: true,
    })
    final_discount: number;
}