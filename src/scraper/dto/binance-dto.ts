export class BinanceDto {
  seller: string;
  price: string;
  methods: string[];

  constructor(ad: any) {
    this.seller = ad.advertiser.nickName;
    this.price = `${ad.adv.price} ${ad.adv.fiatUnit}`;
    this.methods = ad.adv.tradeMethods.map((m) => m.tradeMethodName);
  }
}