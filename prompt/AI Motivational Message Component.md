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

# AI Motivational Message Component Implementation Guide

## Task
Implement an AI Motivational Message Component that provides personalized motivational messages based on user check-ins.

## Implementation Guide

### Overview
The AI Motivational Message Component, named `AICoachCard`, will display a motivational message to the user. Initially, it will show a default message, and upon user check-in, it will update the message based on the user's mood input.

### Steps to Implement

1. **Create the AICoachCard Component**
   - **Location**: `components/app/AICoachCard.tsx`
   - **Purpose**: Display a motivational message that updates based on user check-ins.

2. **Set Up the Component Structure**
   - Use the `Card` component from `shadcn/ui` for the main container.
   - Add a heading for the motivational message using Tailwind CSS classes for styling.
   - Include a paragraph for the message content.

3. **Add Default Motivational Message**
   - Initialize the component with a default motivational message.
   - Use a state variable to manage the message content.

4. **Update Message Based on Check-In**
   - Listen for updates from the Check-In component (Task 2).
   - Use a simple decision algorithm to update the message based on keywords in the mood text.
   - Example: If the mood text contains "happy", display a message like "Keep up the great work!".

5. **Styling**
   - Use Tailwind CSS classes to ensure the component matches the app's theme.
   - Example classes: `bg-primary`, `text-primary-foreground`, `p-4`, `rounded-lg`.

6. **Add Icons for Visual Appeal**
   - Use Lucide React icons to add a visual element, such as a lightbulb or heart icon.
   - Position the icon next to the message heading.

### Example Code

```typescript
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui';
import { Lightbulb } from 'lucide-react';

const AICoachCard: React.FC = () => {
  const [message, setMessage] = useState('Welcome! Here’s a motivational tip to start your day.');

  // Simulate message update based on mood input
  useEffect(() => {
    // Example: Listen for mood updates (replace with actual event listener)
    const mood = 'happy'; // This should come from the Check-In component

    if (mood.includes('happy')) {
      setMessage('Keep up the great work!');
    } else if (mood.includes('sad')) {
      setMessage('Every day is a new opportunity. Stay positive!');
    }
    // Add more conditions as needed
  }, []);

  return (
    <Card className="bg-primary text-primary-foreground p-4 rounded-lg">
      <div className="flex items-center">
        <Lightbulb className="mr-2" />
        <h2 className="text-lg font-semibold">Motivational Message</h2>
      </div>
      <p className="mt-2">{message}</p>
    </Card>
  );
};

export default AICoachCard;
```

### Debug Logging
- Add console logs to track the mood input and the resulting message.
- Example: `console.log('Mood:', mood, 'Message:', message);`

### Integration
- Ensure the `AICoachCard` is imported and used in the main dashboard page (`app/app/page.tsx`).
- Position it above or beside the `CheckInCard` for a cohesive user experience.

By following these steps, you will create a dynamic and engaging AI Motivational Message Component that enhances the user's experience by providing personalized encouragement based on their daily check-ins.