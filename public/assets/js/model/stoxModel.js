function Stox(id,asset1,invested1,amount1,price1,shares1,closing1,asset2,invested2,amount2,price2,shares2,closing2,comment,date,author){
    this._id = id;
    this.asset1_name = asset1;
    this.asset1_invested = invested1;
    this.asset1_amount = amount1;
    this.asset1_price = price1,
    this.asset1_shares = shares1;
    this.asset1_closing = closing1,
    this.asset2_name = asset2;
    this.asset2_invested = invested2;
    this.asset2_amount = amount2;
    this.asset2_price = price2,
    this.asset2_shares = shares2;
    this.asset2_closing = closing2,
    this.comment = comment;
    this._date = date;
    this.author = author;
}

export { Stox }