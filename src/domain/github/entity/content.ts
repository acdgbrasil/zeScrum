export class Content {
    constructor(
        public number: number,
        public title: string,
        public url: string,
        public state: string,
        public labels: string[] = [],
    ){}
}