const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function authenticate(req) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('Missing token');

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) throw new Error('Invalid token');

  return data.user;
}

module.exports = authenticate;
