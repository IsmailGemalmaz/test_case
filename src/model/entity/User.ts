import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";
import { Comment } from "./Comment";
import { JwtToken } from './JwtToken';
import { Role } from './Role';
import { DateUtil } from '../../util/DateUtil';
import * as bcrypt from "bcrypt";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column("int")
    public createDate: number;

    @Column("varchar")
    public password: string;

    @Column("varchar", {nullable: true})
    public tempPassword: string;

    @Column("varchar")
    public email: string;

    @Column("varchar", {nullable: true})
    public firstName: string;

    @Column("varchar", {nullable: true})
    public lastName: string;

    @OneToOne(() => Role, role => role.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    role: Role;

    @OneToMany(() => JwtToken, token => token.user, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    token: JwtToken[];

    @OneToMany(() => Article, article => article.user)
    article: Article[];

    @OneToMany(() => Comment, comment => comment.user)
    comment: Comment[];

    @BeforeInsert()
    async beforeInsertion() {
        this.createDate = DateUtil.getUtcNowInSec();
        await this.updatePassword();
    }

    @BeforeUpdate()
    async beforeUpdate() {
        await this.updatePassword();
        await this.updateTempPassword();
    }

    public async isPasswordCorrect(password: string): Promise<boolean> {
        if (!this.password) {
            return false;
        }
        return await bcrypt.compare(password, this.password);
    }

    public async isTempPasswordCorrect(passwordToCompare: string): Promise<boolean> {
        if (!this.tempPassword) {
            return false;
        }
        return await bcrypt.compare(passwordToCompare, this.tempPassword);
    }

    public async updatePassword() {
        if (!this.password) {
            return;
        } else {
            try {
                this.password = await bcrypt.hash(this.password, 12);
            } catch (error) {
                throw error;
            }
        }
    }

    public async updateTempPassword() {
        if (!this.tempPassword) {
            return;
        } else {
            try {
                this.tempPassword = await bcrypt.hash(this.tempPassword, 12);
            } catch (error) {
                throw error;
            }
        }
    }

}