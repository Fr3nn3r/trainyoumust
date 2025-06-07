# ContentCenter - Supabase Backend

This repository contains the Supabase backend implementation for the ContentCenter coaching app.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Note your project URL and API keys

### 2. Set Up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

### 3. Run Database Migrations

You can run the SQL scripts in the `scripts` folder in the following order:

1. `01_initial_schema.sql` - Creates the database tables
2. `02_security_policies.sql` - Sets up Row Level Security policies
3. `03_triggers_functions.sql` - Creates database triggers and functions
4. `04_seed_data.sql` - Adds sample data for testing

You can run these scripts in the Supabase SQL Editor or using the Supabase CLI.

### 4. Configure Authentication Providers

In the Supabase dashboard:

1. Go to Authentication > Providers
2. Enable Email/Password authentication
3. Configure OAuth providers:
   - Google
   - GitHub
   - LinkedIn

### 5. Install Dependencies

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

## Database Schema

The database consists of the following tables:

- `profiles` - User profile information
- `coaching_preferences` - User coaching style preferences
- `notification_preferences` - User notification settings
- `goals` - User goals with progress tracking
- `check_ins` - User check-in sessions
- `messages` - Messages within check-in sessions
- `reminders` - User reminders
- `user_stats` - User engagement statistics

## API Usage

The backend provides utility functions for:

- Authentication (email and OAuth providers)
- User profile management
- Goals management
- Check-ins and messaging
- Reminders
- User statistics

## Security

The backend implements Row Level Security (RLS) policies to ensure users can only access their own data.

## Real-time Features

The backend supports real-time updates for:

- Messages in check-in sessions
- Reminders

## Future Enhancements (Not in MVP)

- Admin and coach roles
- File storage for profile pictures and documents
- Goal sharing between users and coaches
- Custom API endpoints and functions
- Advanced analytics and reporting
