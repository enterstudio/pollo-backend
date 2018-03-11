// @flow
import AppDevRouter from '../utils/AppDevRouter';
import constants from '../utils/constants';
import PollsRepo from '../repos/PollsRepo';
import { Request } from 'express';

class EndPollRouter extends AppDevRouter<Object> {
  constructor () {
    super(constants.REQUEST_TYPES.POST);
  }

  getPath (): string {
    return '/polls/:id/end/';
  }

  async content (req: Request) {
    const id = req.params.id;
    const save = req.body.save;

    const poll = await PollsRepo.getPollById(id);
    if (!poll) {
      throw new Error(`No poll with id ${id} found.`);
    }

    if (save === 'false' || save === '0') {
      await PollsRepo.deletePollById(id);
    }

    req.app.pollManager.endPoll(poll, save);

    return null;
  }
}

export default new EndPollRouter().router;
