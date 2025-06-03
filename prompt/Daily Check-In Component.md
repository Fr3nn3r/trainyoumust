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

# Daily Check-In Component Implementation Guide

## Task
Implement the Daily Check-In component to allow users to log their mood, note wins, and optionally upload a progress screenshot.

## Implementation Guide

### Step 1: Create the CheckInCard Component

1. **File Location**: Create a new file `CheckInCard.tsx` in `components/app/`.

2. **Component Structure**:
   - Use `Card` from `shadcn/ui` to wrap the entire component.
   - Include a heading with a friendly prompt like “How are you feeling today?”.
   - Add a `textarea` for mood journaling.
   - Add an `input` field for listing wins.
   - Use a file upload component from `shadcn/ui` for the optional progress screenshot.
   - Include a “Submit Check-In” button.

3. **Styling**:
   - Use Tailwind CSS classes such as `bg-primary`, `text-primary-foreground`, and `border-primary` to ensure consistent styling.
   - Use Lucide React icons for visual cues (e.g., a smiley icon near the mood input).

### Step 2: Manage Local State

1. **State Variables**:
   - `mood`: string to capture the mood/journal text.
   - `wins`: string to capture the wins or accomplishments.
   - `file`: object to store the uploaded image file.
   - `date`: automatically set to the current date on submission.

2. **State Management**:
   - Use React's `useState` hook to manage these state variables.
   - Example:
     ```typescript
     const [mood, setMood] = useState('');
     const [wins, setWins] = useState('');
     const [file, setFile] = useState<File | null>(null);
     ```

### Step 3: Implement the File Upload

1. **File Upload Component**:
   - Use the `Dropzone` component from `shadcn/ui` for file uploads.
   - Ensure it accepts only image files.

2. **File Handling**:
   - Update the `file` state when a user selects a file.
   - Example:
     ```typescript
     const handleFileChange = (files: File[]) => {
       if (files.length > 0) {
         setFile(files[0]);
       }
     };
     ```

### Step 4: Handle Form Submission

1. **Validation**:
   - Ensure that a user can only check in once per day.
   - Validate that the mood and wins fields are not empty before submission.

2. **Submission Logic**:
   - On form submission, package the data (mood, wins, file, date) and send it to the backend.
   - Use the `checkin` API endpoint to persist the data in Supabase.

3. **Example Submission Function**:
   ```typescript
   const handleSubmit = async () => {
     if (!mood || !wins) {
       console.error('Mood and wins are required.');
       return;
     }

     try {
       const response = await fetch('/api/checkin', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ mood, wins, file, date: new Date() }),
       });

       if (!response.ok) {
         throw new Error('Failed to submit check-in');
       }

       console.log('Check-in submitted successfully');
     } catch (error) {
       console.error('Error submitting check-in:', error);
     }
   };
   ```

### Step 5: Integrate with the Dashboard

1. **Import and Use**:
   - Import `CheckInCard` into `app/app/page.tsx`.
   - Place it in the main content area of the dashboard layout.

2. **Ensure Responsiveness**:
   - Use Tailwind CSS classes to ensure the component is responsive and looks good on all screen sizes.

### Step 6: Debug Logging

1. **Add Debug Logs**:
   - Add `console.log` statements to track the state changes and submission process.
   - Example:
     ```typescript
     console.log('Mood:', mood);
     console.log('Wins:', wins);
     console.log('File:', file);
     ```

By following these steps, you will implement a functional and visually appealing Daily Check-In component that allows users to log their mood, note wins, and optionally upload a progress screenshot. This component will integrate seamlessly with the existing dashboard layout and backend infrastructure.