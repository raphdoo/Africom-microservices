import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    process.on('SIGTERM', () => {
      this.client.close();
    });

    return new Promise((resolve, reject) => {
      this.client.on('connect', (done) => {
        console.log('connected to NATS');
        resolve(done);
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();