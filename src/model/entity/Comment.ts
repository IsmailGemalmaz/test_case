import { AfterLoad, Column, Entity, OneToMany,ManyToOne, PrimaryGeneratedColumn,BeforeInsert } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";
import { DateUtil } from "../../util/DateUtil";
@Entity("comment")
export class Comment {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column("int")
    public userId: number;

    @Column("int")
    public createDate: number;

    @Column("int")
    public articleId: number;

    @Column("text")
    public comment: string;

    @ManyToOne(() => Article, article => article.comment, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    article: Article;

    @ManyToOne(() => User, user => user.comment, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    user: User;

    @BeforeInsert()
    async beforeInsertion() {
        this.createDate = DateUtil.getUtcNowInSec();
    }
}