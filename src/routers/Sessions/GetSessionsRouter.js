// @flow
import { Request } from 'express';
import AppDevRouter from '../../utils/AppDevRouter';
import constants from '../../utils/constants';
import UsersRepo from '../../repos/UsersRepo';

class GetSessionsRouter extends AppDevRouter<Object> {
  constructor () {
    super(constants.REQUEST_TYPES.GET);
  }

  getPath (): string {
    return '/sessions/:role/';
  }

  async content (req: Request) {
    const role = req.params.role;
    var sessions = await UsersRepo.getSessionsById(req.user.id, role);
    if (!sessions) throw new Error('Can\'t find sessions for user!');
    return sessions
      .filter(Boolean)
      .filter(function (s) {
        return !s.isGroup;
      })
      .map(session => ({
        node: {
          id: session.id,
          name: session.name,
          code: session.code,
          isGroup: session.isGroup
        }
      }));
  }
}

export default new GetSessionsRouter().router;
