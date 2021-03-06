// @flow
import { Request } from 'express';
import AppDevRouter from '../../../utils/AppDevRouter';
import DraftsRepo from '../../../repos/DraftsRepo';
import constants from '../../../utils/Constants';

import type { APIDraft } from '../APITypes';

class PostDraftRouter extends AppDevRouter<Object> {
    constructor() {
        super(constants.REQUEST_TYPES.POST);
    }

    getPath(): string {
        return '/drafts/';
    }

    async content(req: Request): Promise<{ node: APIDraft }> {
        let { text, options } = req.body;
        const { user } = req;

        if (!text) text = '';
        if (!options) options = [];

        const draft = await DraftsRepo.createDraft(text, options, user);

        return {
            node: {
                id: draft.id,
                text: draft.text,
                options: draft.options,
            },
        };
    }
}

export default new PostDraftRouter().router;
