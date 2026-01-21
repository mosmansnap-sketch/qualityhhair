// Netlify serverless function for Discount Code Validation
// Validates consultation discount codes at checkout

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ 
      valid: false, 
      error: 'No code provided' 
    });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Look up the discount code
    const { data: discountCode, error } = await supabase
      .from('discount_codes')
      .select('*, consultations(*)')
      .eq('code', code.toUpperCase().trim())
      .single();

    if (error || !discountCode) {
      return res.status(200).json({
        valid: false,
        error: 'Invalid discount code',
      });
    }

    const now = new Date();
    const activationDate = new Date(discountCode.activation_date);
    const expiresAt = new Date(discountCode.expires_at);

    // Check if already used
    if (discountCode.used) {
      return res.status(200).json({
        valid: false,
        error: 'This code has already been used',
      });
    }

    // Check if not yet activated (before consultation date)
    if (now < activationDate) {
      return res.status(200).json({
        valid: false,
        error: `This code activates on ${activationDate.toLocaleDateString('en-GB', { 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} (your consultation date)`,
      });
    }

    // Check if expired
    if (now > expiresAt) {
      return res.status(200).json({
        valid: false,
        error: 'This code has expired (valid for 48 hours after consultation)',
      });
    }

    // Code is valid!
    return res.status(200).json({
      valid: true,
      discount: {
        code: discountCode.code,
        amount: parseFloat(discountCode.amount),
        expiresAt: expiresAt.toISOString(),
      },
    });

  } catch (error) {
    console.error('Error validating discount code:', error);
    return res.status(500).json({
      valid: false,
      error: 'Failed to validate code',
    });
  }
}
