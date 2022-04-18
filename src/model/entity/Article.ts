import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,BeforeInsert } from "typeorm";
import { DateUtil } from "../../util/DateUtil";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity("article")
export class Article {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column("int")
    public createDate: number;

    @Column("int")
    public userId: number;

    @Column("varchar")
    public articleName: string;

    @Column("text")
    public articleText: string;

    @Column("tinyint",{default:0})
    public isSendMail: boolean;

    @ManyToOne(() => User, user => user.article, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    user: User;

    @OneToMany(() => Comment, comment => comment.article)
    comment: Comment[];

    @BeforeInsert()
    async beforeInsertion() {
        this.createDate = DateUtil.getUtcNowInSec();
    }
}