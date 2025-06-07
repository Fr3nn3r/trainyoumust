# ContentCenter - Supabase Backend

## Requirements Overview

### MVP Features

#### Authentication
- Supabase Auth integration
- Support for email, Google, GitHub, and LinkedIn providers
- Basic user profile data (firstName, lastName, email, etc.)

#### Data Models
- **Users**: Store user profile and preferences
- **Check-ins**: Store conversation history between user and AI coach
- **Reminders**: Store user reminders with notification capability
- **Goals**: Track user goals with progress tracking
- **Coaching Preferences**: Store in a dedicated table

#### User Roles
- Single user role (client/user)
- AI-based coaching only

#### Real-time Features
- Real-time chat updates using Supabase Realtime
- Real-time notifications for reminders

#### Analytics
- Track user engagement metrics (login frequency, check-in streaks)
- Store dashboard stats

#### Security
- Row-level security (RLS) policies to ensure users only see their own data

### Future Features (Not in MVP)

#### User Roles
- Admin role
- Human coach role

#### File Storage
- Profile pictures
- Document uploads

#### Advanced Features
- Goal sharing between users and coaches
- Custom API endpoints and functions
- Advanced analytics and reporting

## Implementation Details

- SQL migration files for easy deployment
- Seed data for testing
- Environment variables for local/dev deployment
\`\`\`

Now, let's create the SQL migration files for our database schema:
