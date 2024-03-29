const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
stocks:[{
    type: Schema.Types.ObjectId,
    ref: 'Stock'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('PortfolioList', portfolioListSchema);
