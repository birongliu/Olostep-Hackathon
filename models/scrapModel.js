import mongoose from 'mongoose';

const scrapedDataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  headings: {
    type: [String],
  },
  links: [
    {
      text: {
        type: String,
        required: true,
      },
      href: {
        type: String,
        required: true,
      },
    },
  ],
  paragraphs: {
    type: [String],
  },
  analysisSummary: {
    type: String,
  },
  insights: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ScrapedData = mongoose.model('ScrapedData', scrapedDataSchema);

export default ScrapedData;
