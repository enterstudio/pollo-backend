// @flow
import { Request } from 'express';
import AppDevRouter from './AppDevRouter';

type id = number

export type AppDevNodeResponse<T> = { node: T }

/**
 * For fetching nodes.
 * NOTE: Expects the path to contain an :id field!
 */
class AppDevNodeRouter<T> extends AppDevRouter<AppDevNodeResponse<T>> {
  constructor (auth: ?boolean) {
    super('GET', auth);
  }

  async fetchWithId (id: id, req: Request): Promise<?T> {
    throw new Error(`Not implemented for path ${this.getPath()}`);
  }

  async content (req: Request): Promise<AppDevNodeResponse<T>> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) throw new Error(`Invalid id ${req.params.id}`);
    const node: ?T = await this.fetchWithId(id, req);
    if (!node) throw new Error(`Could not fetch id:${req.params.id}`);
    return { node };
  }
}

export default AppDevNodeRouter;
