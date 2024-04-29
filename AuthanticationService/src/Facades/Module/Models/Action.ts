import mongoose, { Document, Model } from 'mongoose';

export interface IAction extends Document {
  url: string;
  type: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace';
}

const actionSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['all', 'get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'trace'] }
});

const Action: Model<IAction> = mongoose.model<IAction>('Action', actionSchema);

export default Action;
