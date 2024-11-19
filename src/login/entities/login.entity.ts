import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Login {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    account:string
    @Column()
    password:string
}

