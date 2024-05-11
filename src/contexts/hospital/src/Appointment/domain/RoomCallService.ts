export interface RoomCallService {
  generateToken(appointmentId: string): Promise<string>;
}
