// @flow
import AppDevEdgeRouter from '../../../utils/AppDevEdgeRouter';
import GroupsRepo from '../../../repos/GroupsRepo';
import constants from '../../../utils/Constants';
import type { APIUser } from '../APITypes';

class GetMembersRouter extends AppDevEdgeRouter<APIUser> {
    constructor() {
        super(constants.REQUEST_TYPES.GET);
    }

    getPath(): string {
        return '/sessions/:id/members/';
    }

    async contentArray(req, pageInfo, error) {
        const { id } = req.params;
        const users = await GroupsRepo.getUsersByGroupID(id, 'member');
        return users
            .filter(Boolean)
            .map(user => ({
                node: {
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    netID: user.netID,
                },
                cursor: user.createdAt.valueOf(),
            }));
    }
}

export default new GetMembersRouter().router;
