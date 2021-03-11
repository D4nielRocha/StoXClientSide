      //======================YAHOO FINANCE API  ===================================//
       
    const API_KEY = "69cdd731d7mshb69784c2a6313b4p1c5444jsnb4f2c4a294ac";
    const API_KEY_2 = "8f6042bc97msha003fe69e6bb4f4p105aabjsna64480f53e4c";
    // const init = {method: 'GET', headers: `${headers}`, mode: 'cors', cache: 'default'};

    //trending tickers
    const url1 = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers?region=US`;
    //news source
    // const url = `https://newsapi.org/v2/top-headlines?sources?category=${news_source}&apiKey=${API_KEY}`;
    //popular watchlists
    // const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-popular-watchlists`;
    //market movers
    // const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=US&lang=en-US&start=0&count=6`;
    //summary 
    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-summary?region=US"`;

    //news 
    const urlNews = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/get-details',
        params: {uuid: '9803606d-a324-3864-83a8-2bd621e6ccbd', region: 'US'},
        headers: {
          'x-rapidapi-key': '8f6042bc97msha003fe69e6bb4f4p105aabjsna64480f53e4c',
          'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
      };

      //charts
      const urlCharts = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts',
        params: {
          symbol: '^GSPC',
          interval: '5m',
          range: '1d',
          region: 'US',
          comparisons: '^GDAXI,^FCHI'
        },
        headers: {
          'x-rapidapi-key': '8f6042bc97msha003fe69e6bb4f4p105aabjsna64480f53e4c',
          'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
      };


      //generic header
    const headers = {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "8f6042bc97msha003fe69e6bb4f4p105aabjsna64480f53e4c",
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
            }};





      //======================MARKETSTACK ===================================//

      const marketURL = `http://api.marketstack.com/v1/eod?access_key=8ab519ff412561125ca0729e24df2b3c&symbols=MSFT`;


      //===================NEWS API ======================================//

      const NEWS_API = `https://newsapi.org/v2/top-headlines?sources=business-insider&apiKey=3d286b585e694be39fcdfd24d4856f2e`;


      //===================ALPHA ADVANTAGE API ======================================//


      const ALPHA_API_KEY = 'W3975TFRO13G7RVG';

      const ALPHA_DAILY_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${ALPHA_API_KEY}`;
