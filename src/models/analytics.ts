import mongoose from "mongoose";
import {UserDocument} from "./user";
const Schema = mongoose.Schema;

export type AnalyticsDocument = mongoose.Document & {
  ip: string,
  user: UserDocument,
  url: string,
  createdAt: Date
};

const AnalyticsSchema = new Schema({
  ip: String,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  url: String,
  createdAt: { type: Date, default: Date.now }
});

AnalyticsSchema.statics = {
  list: function(options: any) {
    const criteria = options.criteria || {};
    return this.find(criteria)
      .populate("user", "name username provider")
      .sort({ createdAt: -1 })
      .limit(options.perPage)
      .skip(options.perPage * options.page);
  }
};

mongoose.model("Analytics", AnalyticsSchema);
