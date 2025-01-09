import { Injectable, Logger } from '@nestjs/common';
import { LanguageServiceClient } from '@google-cloud/language';
import { GoogleAuth } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LanguageApiService {
  private logger = new Logger(LanguageApiService.name);
  private client: LanguageServiceClient;
  constructor(private configService: ConfigService) {
    // @TODO: implement auth file.
    const keyFilename = this.configService.get('vendor.gcpAuthFile');

    // Initialize client
    // @TODO: handle authentication with auth file.
    const auth = new GoogleAuth({
      keyFile: keyFilename,
      scopes: ['https://www.googleapis.com/auth/cloud-language'],
    });
    this.client = new LanguageServiceClient({ auth });
  }

  async analyzeSentiment(
    inputText: string,
  ): Promise<{ score: number; magnitude: number }> {
    const PLAIN_TEXT = 1;
    const document = {
      content: inputText,
      type: PLAIN_TEXT,
    };

    // Detects the sentiment of the text
    const [result] = await this.client.analyzeSentiment({ document });
    const sentiment = result.documentSentiment;
    return { score: sentiment.score, magnitude: sentiment.magnitude };
  }
}
