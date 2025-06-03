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

# Overall Layout & Global UI Setup Implementation Guide

## Task
Implement the overall layout and global UI setup for the AI Coach dashboard.

## Implementation Guide

### Step 1: Set Up the Dashboard Layout

1. **File Location**: Open or create `app/app/page.tsx`.

2. **Layout Structure**:
   - Use shadcn/ui layout components to structure the dashboard.
   - Divide the main content area into sections for:
     - Coaching messages
     - Daily check-in input
     - Wins gallery
     - History timeline

3. **Header Integration**:
   - The header is already imported via `app/layout.tsx`.
   - Ensure the header is styled consistently with the rest of the dashboard.

4. **Styling**:
   - Use Tailwind CSS utility classes for consistent theming.
   - Apply classes like `bg-primary` and `text-primary-foreground` to match the app’s styling.

### Step 2: Update the Header Component

1. **File Location**: Open `components/app/Header.tsx`.

2. **Styling Updates**:
   - Use Tailwind utility classes to update the header’s style.
   - Ensure the header uses `bg-primary` for the background and `text-primary-foreground` for text color.
   - Make sure the header integrates seamlessly with the dashboard layout.

### Step 3: Implement Static Layout

1. **Static Content**:
   - Focus on scaffolding the static layout without dynamic data at this stage.
   - Ensure the layout is responsive and visually appealing.

2. **UI Components**:
   - Use shadcn/ui components like `Container`, `Card`, and `Flex` to organize the layout.
   - Ensure components are responsive using Tailwind’s responsive utility classes.

### Step 4: Debug Logging

1. **Add Debug Logs**:
   - Add console logs to track the rendering of each section.
   - Example: `console.log('Rendering Coaching Messages Section');`

2. **Verify Layout**:
   - Ensure all sections are rendering correctly by checking the console logs.

### Step 5: Finalize and Review

1. **Review Layout**:
   - Ensure the layout is consistent with the design requirements.
   - Verify that the header and main content area are styled cohesively.

2. **Responsive Design**:
   - Test the layout on different screen sizes to ensure responsiveness.

By following these steps, you will create a clear and aesthetically consistent dashboard layout for the AI Coach application. This setup will serve as the foundation for integrating additional features like daily check-ins, motivational messages, and progress tracking.