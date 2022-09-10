import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('user')
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 150 })
    username: string;
  
    @Column({ type: 'varchar' })
    password: string;
}