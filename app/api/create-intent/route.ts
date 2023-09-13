import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16"
})

export async function POST(
  request: Request
) {
  const data = await request.json()

  const amount = data.amount

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: 'USD'
    })

    return NextResponse.json(paymentIntent.client_secret, { status: 200 })
  } catch (error) {
    
  }
}