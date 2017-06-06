import BaseService from './baseService';

class ThreadService extends BaseService {
  constructor() {
    super();
  }

  // optimize created?
  create(data) {
    this.query = `INSERT INTO threads (author, created, forum, message, slug, title) 
    VALUES ((SELECT u.nickname FROM users u WHERE lower(u.nickname) = lower('${data.username}')), 
    ${data.created ? `'${data.created}'::TIMESTAMPTZ` : 'current_timestamp'},
    (SELECT f.slug FROM forums f WHERE lower(f.slug) = lower('${data.forum}')), 
    '${data.message}', '${data.slug}', 
    '${data.title}') 
    RETURNING *`;

    return this.dataBase.one(this.query);
  }

  findThreadById(id) {
    this.query = `SELECT t.id, t.slug, t.author, t.created, t.forum, t.message, t.title, t.votes 
    FROM 
    threads t 
    WHERE t.id = ${id}`;

    return this.dataBase.one(this.query);
  }

  findThreadBySlug(slug) {
    this.query = `SELECT t.id, t.author, t.forum, 
    t.slug, t.created, t.message, t.title, t.votes 
    FROM 
    threads t 
    WHERE LOWER(t.slug) = LOWER('${slug}')`;

    return this.dataBase.one(this.query);
  }

  getForumThreads(slug, limit, since, desc) {
    this.query = `SELECT t.id, t.slug, t.author,
    t.forum, t.created, t.message, t.title, t.votes
    FROM
    threads t
    WHERE LOWER(t.forum) = LOWER('${slug}') `;

    if (since) {
      this.query += 'AND t.created';
      this.query += desc === 'true' ? ` <= ` : ` >= `;
      this.query += `'${since}'::TIMESTAMPTZ `;
    }

    this.query += `ORDER BY t.created ${desc === 'true' ? 'DESC' : 'ASC '} LIMIT ${+limit}`;

    return this.dataBase.many(this.query);
  }

  addVote(data, thread) {
    this.query = `INSERT INTO votes (user_id, thread_id, voice) VALUES 
    ((SELECT u.id FROM users u WHERE lower(nickname) = lower('${data.nickname}')), ${thread.id}, ${data.voice}) 
    ON CONFLICT (user_id, thread_id) DO 
    UPDATE SET voice = ${data.voice}`;

    return this.dataBase.none(this.query);
  }

  getVotes(id) {
    this.query = `SELECT t.votes FROM threads t 
    WHERE t.id = ${id}`;

    return this.dataBase.one(this.query);
  }
}

const threadService = new ThreadService();
export default threadService;
