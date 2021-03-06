// @flow
import { Request } from 'express';
import AppDevRouter from './AppDevRouter';
import LogUtils from './LogUtils';

type id = number

export type AppDevNodeResponse<T> = { node: T }

/**
 * For fetching nodes.
 * NOTE: Expects the path to contain an :id field!
 */
class AppDevNodeRouter<T> extends AppDevRouter<AppDevNodeResponse<T>> {
    constructor(auth: ?boolean) {
        super('GET', auth);
    }

    async fetchWithID(givenID: id, req: Request): Promise<?T> {
        throw LogUtils.logError(`Not implemented for path ${this.getPath()}`);
    }

    async content(req: Request): Promise<AppDevNodeResponse<T>> {
        const givenID = parseInt(req.params.id);
        if (Number.isNaN(givenID)) throw LogUtils.logError(`Invalid id ${req.params.id}`);
        const node: ?T = await this.fetchWithID(givenID, req);
        if (!node) throw LogUtils.logError(`Could not fetch id:${req.params.id}`);
        return { node };
    }
}

export default AppDevNodeRouter;
