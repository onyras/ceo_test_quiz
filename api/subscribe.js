// Vercel Serverless Function for Newsletter Subscription
// This endpoint receives email signups and can be connected to your newsletter service

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
        const { email, firstName, company } = req.body;

        // Validate email
        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ error: 'Valid email is required' });
        }

        // Log the subscription (for debugging)
        console.log('New subscription:', { email, firstName, company, timestamp: new Date().toISOString() });

        // ============================================
        // NEWSLETTER SERVICE INTEGRATION
        // ============================================
        // Uncomment and configure ONE of the following:

        // OPTION 1: ConvertKit
        // await subscribeToConvertKit(email, firstName, company);

        // OPTION 2: Mailchimp
        // await subscribeToMailchimp(email, firstName, company);

        // OPTION 3: Buttondown
        // await subscribeToButtondown(email);

        // OPTION 4: Store in a database or spreadsheet
        // await storeSubscription(email, firstName, company);

        // For now, we'll just return success
        // The subscription data is logged above

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

// ============================================
// NEWSLETTER SERVICE FUNCTIONS
// ============================================

// ConvertKit Integration
// Set environment variable: CONVERTKIT_API_KEY and CONVERTKIT_FORM_ID
async function subscribeToConvertKit(email, firstName, company) {
    const API_KEY = process.env.CONVERTKIT_API_KEY;
    const FORM_ID = process.env.CONVERTKIT_FORM_ID;

    const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            api_key: API_KEY,
            email: email,
            first_name: firstName,
            fields: { company: company }
        })
    });

    if (!response.ok) {
        throw new Error('ConvertKit subscription failed');
    }
    return response.json();
}

// Mailchimp Integration
// Set environment variables: MAILCHIMP_API_KEY, MAILCHIMP_SERVER, MAILCHIMP_LIST_ID
async function subscribeToMailchimp(email, firstName, company) {
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const SERVER = process.env.MAILCHIMP_SERVER; // e.g., 'us1'
    const LIST_ID = process.env.MAILCHIMP_LIST_ID;

    const response = await fetch(
        `https://${SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`
            },
            body: JSON.stringify({
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName || '',
                    COMPANY: company || ''
                }
            })
        }
    );

    if (!response.ok && response.status !== 400) {
        throw new Error('Mailchimp subscription failed');
    }
    return response.json();
}

// Buttondown Integration
// Set environment variable: BUTTONDOWN_API_KEY
async function subscribeToButtondown(email) {
    const API_KEY = process.env.BUTTONDOWN_API_KEY;

    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${API_KEY}`
        },
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        throw new Error('Buttondown subscription failed');
    }
    return response.json();
}
