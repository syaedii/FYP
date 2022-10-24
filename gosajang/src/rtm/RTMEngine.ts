
import RtmEngine from 'agora-react-native-rtm';

class RTMEngine {
  engine!: RtmEngine;
  private localUID: string = '';
  private channelId: string = '';

  private static _instance: RTMEngine | null = null;

  public static getInstance() {
    if (!RTMEngine._instance) {
      return new RTMEngine();
    }
    return RTMEngine._instance;
  }

  private async createClientInstance() {
    await this.engine.createClient($config.APP_ID);
  }

  private async destroyClientInstance() {
    await this.engine.logout();
    await this.engine.destroyClient();
  }

  private constructor() {
    if (RTMEngine._instance) {
      return RTMEngine._instance;
    }
    RTMEngine._instance = this;
    this.engine = new RtmEngine();
    this.localUID = '';
    this.channelId = '';
    this.createClientInstance();

    return RTMEngine._instance;
  }

  setLoginInfo(localUID: string, channelID: string) {
    this.localUID = localUID;
    this.channelId = channelID;
  }
  get localUid() {
    return this.localUID;
  }
  get channelUid() {
    return this.channelId;
  }
  destroy() {
    try {
      this.destroyClientInstance();
      RTMEngine._instance = null;
    } catch (error) {
      console.log('Error destroying instance error: ', error);
    }
  }
}

export default RTMEngine;
