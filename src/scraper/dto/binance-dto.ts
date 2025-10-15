export class BinanceDto {
  seller: string;
  price: string;
  methods: string[];
  tradeType: 'SELL' | 'BUY';

  constructor(ad: any, tradeType: 'SELL' | 'BUY') {
    this.seller = ad.advertiser.nickName;
    this.price = `${ad.adv.price} ${ad.adv.fiatUnit}`;
    this.methods = ad.adv.tradeMethods.map((m) => m.tradeMethodName);
    this.tradeType = tradeType;
  }
}
