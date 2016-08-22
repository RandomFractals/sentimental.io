/**
 * Tweet Sentiment type.
 */
export class Sentiment {

  type: string;
  score: Number;

  // raw JSON data
  data:any;

  constructor (sentimentData:any) {
    this.type = sentimentData.type;
    this.score = Number(sentimentData.score);
    this.data = sentimentData;
  }
}
