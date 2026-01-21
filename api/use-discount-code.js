// Netlify serverless function for marking a discount code as used
// Called after successful checkout

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

  const { code, orderId } = req.body;

  if (!code) {
    return res.status(400).json({ 
      success: false, 
      error: 'No code provided' 
    });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Update the discount code as used
    const { data, error } = await supabase
      .from('discount_codes')
      .update({
        used: true,
        used_at: new Date().toISOString(),
        used_order_id: orderId || null,
      })
      .eq('code', code.toUpperCase().trim())
      .eq('used', false) // Only update if not already used
      .select()
      .single();

    if (error) {
      console.error('Error marking code as used:', error);
      return res.status(200).json({
        success: false,
        error: 'Failed to apply discount code',
      });
    }

    if (!data) {
      return res.status(200).json({
        success: false,
        error: 'Code not found or already used',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Discount code applied successfully',
    });

  } catch (error) {
    console.error('Error using discount code:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to apply discount code',
    });
  }
}
