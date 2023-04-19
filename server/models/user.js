// require ('dotenv').config();
const db = require('./db');


module.exports = {
  findOrCreate: async (profile) => {
    const user = await db.oneOrNone('SELECT * FROM users WHERE oauth_id = \\$1', [profile.id]);
    if (user) {
      console.log('User already exists', user);
      return user;
    } else {
      console.log('User does not exist, creating user');
      return db.one('INSERT INTO users(oauth_id, email, display_name, provider, highscore) VALUES(\\$1, \\$2, \\$3, \\$4, \\$5) RETURNING *', [
        profile.id,
        profile.emails[0].value,
        profile.displayName,
        profile.provider,
        0, // Initial highscore value
      ]);
    }
  },
};



