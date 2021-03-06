// @flow
import { Request } from 'express';
import AppDevRouter from '../../../utils/AppDevRouter';
import LogUtils from '../../../utils/LogUtils';
import constants from '../../../utils/Constants';
import GroupsRepo from '../../../repos/GroupsRepo';

class DeleteMembersRouter extends AppDevRouter<Object> {
    constructor() {
        super(constants.REQUEST_TYPES.PUT);
    }

    getPath(): string {
        return '/sessions/:id/members/';
    }

    async content(req: Request) {
        const groupID = req.params.id;
        const { user } = req;
        const memberIDs = JSON.parse(req.body.memberIDs);

        if (!memberIDs) throw LogUtils.logError('List of member ids missing!');

        if (!await GroupsRepo.isAdmin(groupID, user)) {
            throw LogUtils.logError('You are not authorized to remove members from this group!');
        }

        await GroupsRepo.removeUserByGroupID(groupID, memberIDs, 'member');
        return null;
    }
}

export default new DeleteMembersRouter().router;
