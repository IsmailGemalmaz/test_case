import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { RoleType } from '../../constant/RoleType';

@Entity('user_role')
export class Role {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'int'})
    public type: RoleType;

    @OneToOne(() => User, user => user.role, {onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;

}
