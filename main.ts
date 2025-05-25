import { BoardCard } from "./src/domain/github/entity/boardCard.ts";
import { Content } from "./src/domain/github/entity/content.ts";
import { getBoardData, getProjectFilds } from "./src/infra/github/github.ts";


// const boardObject = await getBoardData();
// const cards: BoardCard[] = [];
// for (let i=0; i< 5;i++) {
//     const _content = boardObject[i].content;
//     const _labels = _content.labels
//     const cardInformations = boardObject[i].fieldValues.nodes
//     const ownerNameOfCard = boardObject[i].fieldValues.nodes[0]
//     const content = new Content(_content.number,_content.title,_content.url,_content.state,_labels);
//     const card = new BoardCard(
//         boardObject[i].id,
//         boardObject[i].createdAt,
//         boardObject[i].updatedAt,
//         content,{})
//     console.log(cardInformations)
    

//     cards.push(card);
// }

console.log(await getProjectFilds())