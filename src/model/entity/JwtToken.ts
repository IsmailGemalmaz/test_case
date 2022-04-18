import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { DateUtil } from "../../util/DateUtil";

@Entity("user_jwt_token")
export class JwtToken {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column("text")
    public token: string;

    @Column("bigint")
    public createDate: number;

    @Column("bigint", {default: 0})
    public updateDate: number;

    @Column()
    public agent: string;

    @ManyToOne(() => User, user => user.token, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    user: User;

    @BeforeInsert()
    async beforeInsertion() {
        this.createDate = DateUtil.getUtcNowInSec();
    }

    @BeforeUpdate()
    async beforeUpdate() {
        this.updateDate = DateUtil.getUtcNowInSec();
    }
}
