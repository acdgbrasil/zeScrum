import { Content } from "./content.ts";

export class BoardCard {
    constructor(
        public id:string,
        public createdAt: string,
        public updatedAt: string,
        public content:Content,
        public fieldcValues: Record<string,[Record<string,object>]>
    ){}
}