// Vercel Serverless Function for Newsletter Subscription
// Integrated with Beehiiv

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email } = req.body;

        // Validate email
        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ error: 'Valid email is required' });
        }

        // Log the subscription (for debugging)
        console.log('New subscription:', { email, timestamp: new Date().toISOString() });

        // Subscribe to Beehiiv
        await subscribeToBeehiiv(email);

        return res.status(200).json({
            success: true,
            message: 'Successfully subscribed!'
        });

    } catch (error) {
        console.error('Subscription error:', error);
        return res.status(500).json({
            error: 'Failed to subscribe. Please try again.'
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Beehiiv Integration
// Set environment variables in Vercel:
// - BEEHIIV_API_KEY: Your Beehiiv API key (from Settings > Integrations > API)
// - BEEHIIV_PUBLICATION_ID: Your publication ID (from the URL or API settings)
async function subscribeToBeehiiv(email) {
    const API_KEY = process.env.BEEHIIV_API_KEY;
    const PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

    if (!API_KEY || !PUBLICATION_ID) {
        throw new Error('Beehiiv API key or Publication ID not configured');
    }

    const response = await fetch(
        `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                email: email,
                reactivate_existing: true,
                send_welcome_email: true,
                utm_source: 'ceo_test_quiz',
                utm_medium: 'website',
                utm_campaign: 'quiz_signup'
            })
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Beehiiv API error:', errorData);
        throw new Error(`Beehiiv subscription failed: ${response.status}`);
    }

    return response.json();
}
