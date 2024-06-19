import { jwt } from 'twilio';
import { RoomCallService } from '../../domain/RoomCallService';
export class TwilioRoomCallService implements RoomCallService {
  private token: jwt.AccessToken;
  constructor(twilioAccountSid: string, twilioApiKey: string, twilioApiSecret: string) {
    this.token = new jwt.AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, {
      identity: 'user',
    });
  }

  async generateToken(appointmentId: string): Promise<string> {
    const videoGrant = new jwt.AccessToken.VideoGrant({
      room: `appointment-${appointmentId}`,
    });
    this.token.addGrant(videoGrant);
    return this.token.toJwt();
  }
}
