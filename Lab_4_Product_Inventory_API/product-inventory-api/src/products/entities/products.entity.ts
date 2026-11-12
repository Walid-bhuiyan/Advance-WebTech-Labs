import{Column,CreateDateColumn,DeleteDateColumn,Entity,PrimaryColumn,UpdateDateColumn,OneToOne,OneToMany, PrimaryGeneratedColumn,}from 'typeorm'
@Entity('products')
export class Products{
    @PrimaryGeneratedColumn({name:'productId'})
    id:number;
    @Column({name: 'productName'})
    name: string;
    @Column({name: 'description',nullable:true,})
    description: string;
    @Column({name: 'price',type:'decimal',precision:10,scale:2})
    price:number;
    @Column({ name:'inStock',default: 0 })
    stock:number;
    @Column({name:'category'})
    category:string;
    @Column({name:'isActive',default:true})
    isActive : boolean;
    @CreateDateColumn({name:'createdAt'})
    createdAt:Date;
    @UpdateDateColumn({name: 'updatedAt'})
    updatedAt:Date;
}


