const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const authenticate = require('../utils/authenticate');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

router.post('/submit', async (req, res) => {
  try {
    const user = await authenticate(req);
    const { timestamp, responses } = req.body;

    const { error } = await supabase.from('ema_responses').insert([
      { username: user.email, timestamp, responses }
    ]);

    if (error) throw new Error('Insert failed');
    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/my-responses', async (req, res) => {
  try {
    const user = await authenticate(req);
    const { data, error } = await supabase
      .from('ema_responses')
      .select('*')
      .eq('username', user.email);

    if (error) throw new Error('Fetch failed');
    res.json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
