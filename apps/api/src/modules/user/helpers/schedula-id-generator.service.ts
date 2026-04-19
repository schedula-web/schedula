import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';

@Injectable()
export class SchedulaIdGeneratorService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) { }

    async generateSchedulaId(schoolName: string): Promise<string> {
        // Extract first 2 letters from first 2 words of school name
        const words = schoolName.trim().split(/\s+/);
        const firstWordFirstLetter = words[0]?.charAt(0).toUpperCase() || '';
        const secondWordFirstLetter = words[1]?.charAt(0).toUpperCase() || '';
        const nameCode = `${firstWordFirstLetter}${secondWordFirstLetter}`;

        // Get the next sequence number
        const sequenceNumber = await this.getNextSequenceNumber();

        // Format: SID + nameCode + sequenceNumber (3 digits)
        return `SID${nameCode}${sequenceNumber}`;
    }

    private async getNextSequenceNumber(): Promise<string> {
        // Find all users with schedulaId that matches pattern and get the max sequence number
        const lastUser = await this.userModel
            .findOne({
                schedulaId: { $regex: /^SID[A-Z]{2}\d{3}$/ }
            })
            .sort({ schedulaId: -1 })
            .lean()
            .exec();

        if (!lastUser || !lastUser.schedulaId) {
            return '001';
        }

        // Extract the last 3 digits from the schedulaId
        const lastSequence = parseInt(lastUser.schedulaId.slice(-3), 10);
        const nextSequence = lastSequence + 1;

        // Pad with leading zeros
        return nextSequence.toString().padStart(3, '0');
    }
}