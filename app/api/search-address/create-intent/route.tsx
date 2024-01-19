import { Stripe } from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16', 
    typescript: true
  });    
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  
    try {
      const { amount } = req.body;
  
      // Create a PaymentIntent on the server
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd', // or your preferred currency
      });
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating PaymentIntent:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }