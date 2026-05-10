import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Analytics, AnalyticsDocument } from '../schema/analytics.schema';
import { Model } from 'mongoose';

@Injectable()
export class AnalyticsRepository {
    constructor(
        @InjectModel(Analytics.name)
        private model: Model<AnalyticsDocument>,
    ) { }

    updateAnalytics(schedulaId: string, data: Partial<Analytics>) {
        return this.model.findOneAndUpdate(
            { schedulaId },
            { $set: data },
            { new: true, upsert: true }
        ).lean().exec();
    }

    findBySchedulaId(schedulaId: string) {
        return this.model.findOne({ schedulaId }).lean().exec();
    }

    incrementSubstitution(schedulaId: string) {
        return this.model.findOneAndUpdate(
            { schedulaId },
            { $inc: { substitutionEvents: 1 } },
            { new: true, upsert: true }
        ).exec();
    }
}
