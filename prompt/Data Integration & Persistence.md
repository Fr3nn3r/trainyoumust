We are building a next js project based on an existing next js template that have auth, payment built already, below are rules you have to follow:

<frontend rules>
1. MUST Use 'use client' directive for client-side components; In Next.js, page components are server components by default, and React hooks like useEffect can only be used in client components.
2. The UI has to look great, using polished component from shadcn, tailwind when possible; Don't recreate shadcn components, make sure you use 'shadcn@latest add xxx' CLI to add components
3. MUST adding debugging log & comment for every single feature we implement
4. Make sure to concatenate strings correctly using backslash
7. Use stock photos from picsum.photos where appropriate, only valid URLs you know exist
8. Don't update shadcn components unless otherwise specified
9. Configure next.config.js image remotePatterns to enable stock photos from picsum.photos
11. MUST implement the navigation elements items in their rightful place i.e. Left sidebar, Top header
12. Accurately implement necessary grid layouts
13. Follow proper import practices:
   - Use @/ path aliases
   - Keep component imports organized
   - Update current src/app/page.tsx with new comprehensive code
   - Don't forget root route (page.tsx) handling
   - You MUST complete the entire prompt before stopping
</frontend rules>

<styling_requirements>
- You ALWAYS tries to use the shadcn/ui library.
- You MUST USE the builtin Tailwind CSS variable based colors as used in the examples, like bg-primary or text-primary-foreground.
- You DOES NOT use indigo or blue colors unless specified in the prompt.
- You MUST generate responsive designs.
- The React Code Block is rendered on top of a white background. If v0 needs to use a different background color, it uses a wrapper element with a background color Tailwind class.
</styling_requirements>

<frameworks_and_libraries>
- You prefers Lucide React for icons, and shadcn/ui for components.
- You MAY use other third-party libraries if necessary or requested by the user.
- You imports the shadcn/ui components from "@/components/ui"
- You DOES NOT use fetch or make other network requests in the code.
- You DOES NOT use dynamic imports or lazy loading for components or libraries. Ex: const Confetti = dynamic(...) is NOT allowed. Use import Confetti from 'react-confetti' instead.
- Prefer using native Web APIs and browser features when possible. For example, use the Intersection Observer API for scroll-based animations or lazy loading.
</frameworks_and_libraries>

# Data Integration & Persistence Implementation Guide

## Task
Integrate the Check-In, WinsGallery, and HistoryTimeline components with the existing Supabase setup to ensure data persistence and retrieval.

## Implementation Guide

### Step 1: Set Up Supabase Client

1. **Install Supabase Packages**:
   Ensure you have the necessary Supabase packages installed:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. **Environment Variables**:
   Ensure your `.env.local` file contains the following variables:
   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SECRET_KEY=your-secret-key
   ```

3. **Supabase Client Configuration**:
   - **Frontend Client**: Use the existing configuration in `utils/supabase/front.ts` to interact with Supabase from the client side.
   - **Server Client**: Use the configuration in `utils/supabase/server.ts` for server-side operations.

### Step 2: Create API Endpoint for Check-In

1. **Create API Route**:
   - In `app/api/checkin/route.ts`, create a new API route to handle GET and POST requests for check-in records.

2. **API Route Implementation**:
   ```typescript
   import { NextApiRequest, NextApiResponse } from 'next';
   import { createSupabaseAdminClient } from '@/utils/supabase/server';

   export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     const supabase = await createSupabaseAdminClient();

     if (req.method === 'POST') {
       const { mood, wins, screenshot_url } = req.body;
       const { data, error } = await supabase.from('checkin').insert([{ mood, wins, screenshot_url }]);

       if (error) {
         console.error('Error inserting check-in:', error);
         return res.status(500).json({ error: 'Failed to insert check-in' });
       }

       return res.status(200).json(data);
     }

     if (req.method === 'GET') {
       const { data, error } = await supabase.from('checkin').select('*');

       if (error) {
         console.error('Error fetching check-ins:', error);
         return res.status(500).json({ error: 'Failed to fetch check-ins' });
       }

       return res.status(200).json(data);
     }

     res.setHeader('Allow', ['GET', 'POST']);
     res.status(405).end(`Method ${req.method} Not Allowed`);
   }
   ```

### Step 3: Integrate Check-In Submission

1. **CheckInCard Component**:
   - In `components/app/CheckInCard.tsx`, handle form submission to post data to the new API endpoint.

2. **Form Submission Logic**:
   ```typescript
   import { useState } from 'react';

   const CheckInCard = () => {
     const [mood, setMood] = useState('');
     const [wins, setWins] = useState('');
     const [screenshot, setScreenshot] = useState<File | null>(null);

     const handleSubmit = async () => {
       const formData = new FormData();
       formData.append('mood', mood);
       formData.append('wins', wins);
       if (screenshot) {
         formData.append('screenshot_url', screenshot);
       }

       const response = await fetch('/api/checkin', {
         method: 'POST',
         body: formData,
       });

       if (!response.ok) {
         console.error('Failed to submit check-in');
       }
     };

     return (
       <div>
         {/* Form UI */}
         <button onClick={handleSubmit}>Submit Check-In</button>
       </div>
     );
   };
   ```

### Step 4: Fetch and Display Check-In Data

1. **WinsGallery and HistoryTimeline Components**:
   - Use the GET API endpoint to fetch check-in data and display it in these components.

2. **Data Fetching Example**:
   ```typescript
   import { useEffect, useState } from 'react';

   const WinsGallery = () => {
     const [checkins, setCheckins] = useState([]);

     useEffect(() => {
       const fetchCheckins = async () => {
         const response = await fetch('/api/checkin');
         const data = await response.json();
         setCheckins(data);
       };

       fetchCheckins();
     }, []);

     return (
       <div>
         {checkins.map((checkin) => (
           <div key={checkin.id}>
             <p>{checkin.wins}</p>
             {checkin.screenshot_url && <img src={checkin.screenshot_url} alt="Progress" />}
           </div>
         ))}
       </div>
     );
   };
   ```

### Step 5: Error Handling and Debug Logging

1. **Error Handling**:
   - Ensure all API requests handle errors gracefully and provide user feedback.

2. **Debug Logging**:
   - Add console logs to track API requests and responses for easier debugging.

By following these steps, you will integrate the Check-In, WinsGallery, and HistoryTimeline components with Supabase, ensuring data persistence and retrieval. This setup will allow users to submit check-ins and view their progress over time.