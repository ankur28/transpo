import { Stripe } from '@stripe/stripe-js';
import { NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    

export async function POST(request:any){
    const data:any = await request.json()
    const amount = data.amount

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
          });
        return NextResponse.json(paymentIntent.clientSecret,{status:200})
    } catch (error:any) {
        return new NextResponse(error, {
            status: 400
        })
    }
}