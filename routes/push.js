const express = require('express');
const axios = require('axios');
const router = express.Router();
const authenticate = require('../utils/authenticate');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

router.post('/save-token', async (req, res) => {
  try {
    const user = await authenticate(req);
    const { token } = req.body;

    const { error } = await supabase
      .from('push_tokens')
      .upsert({ user_id: user.id, token });

    if (error) throw new Error('Token insert failed');
    res.json({ success: true });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.post('/send-reminders', async (req, res) => {
  try {
    const { data: tokens } = await supabase.from('push_tokens').select('token');
    const messages = tokens.map(({ token }) => ({
      to: token,
      sound: 'default',
      title: 'EMA Reminder',
      body: 'Please complete your EMA check-in.',
    }));

    const chunks = [];
    for (let i = 0; i < messages.length; i += 100) {
      chunks.push(messages.slice(i, i + 100));
    }

    for (const chunk of chunks) {
      await axios.post('https://exp.host/--/api/v2/push/send', chunk, {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    res.json({ success: true, count: tokens.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
