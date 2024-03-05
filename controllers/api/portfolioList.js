const PortfolioList = require('../../models/portfolioList');

module.exports = {
  create,
  show,
  addStock,
  delStock
};

async function create(req, res) {
  try {
    let portfolioList = await PortfolioList.findOne({user: req.user._id}).populate("stocks");
    if (!portfolioList) {
      portfolioList = await PortfolioList.create({user: req.user._id, stocks: []});
    }
    res.json(portfolioList);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}

async function show(req, res) {
  try {
    let portfolioList = await PortfolioList.findOne({user: req.user._id}).populate("stocks");
    if (!portfolioList) {
      portfolioList = await PortfolioList.create({user: req.user._id, stocks: []});
    }
    res.json(portfolioList);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}

async function addStock(req, res) {
  try {
    const portfolioList = await PortfolioList.findOne({user: req.user._id});
    if (!portfolioList) throw new Error('Not Found.');
    // look if it already exists
    if (!portfolioList.stocks.includes(req.body._id)) {
      portfolioList.stocks.push(req.body)
      await portfolioList.save();
    }
    await portfolioList.populate("stocks");
    res.json(portfolioList);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}
  
async function delStock(req, res) {
  try {
    const portfolioList = await PortfolioList.findOne({user: req.user._id});
    if (!portfolioList) throw new Error();
    portfolioList.stocks = portfolioList.stocks.filter(stock => {
      return stock._id != req.body._id
    });
    res.json(await portfolioList.save());
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
}
