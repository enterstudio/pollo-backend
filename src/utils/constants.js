// flow

export type RequestType = 'POST' | 'GET' | 'DELETE' | 'PUT';

const REQUEST_TYPES = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT'
};

export type QuestionType = 'MULTIPLE_CHOICE' | 'FREE_RESPONSE' |
  'MULTIPLE_ANSWER' | 'RANKING'

const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  FREE_RESPONSE: 'FREE_RESPONSE',
  MULTIPLE_ANSWER: 'MULTIPLE_ANSWER',
  RANKING: 'RANKING'
};

const USER_TYPES = {
  ADMIN: 'admin',
  MEMBER: 'member'
};

export default {
  REQUEST_TYPES,
  QUESTION_TYPES,
  USER_TYPES
};
