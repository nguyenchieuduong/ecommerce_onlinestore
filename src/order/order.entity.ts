import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Order {
    @PrimaryGeneratedColumn()
    id: number

    
}