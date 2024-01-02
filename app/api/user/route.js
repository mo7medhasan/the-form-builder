import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server'
 
export async function GET(request) {
    try {
        const user = await currentUser();
        return NextResponse.json(user);
      } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch user' });
      }
 

}