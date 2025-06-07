-- Insert test users (these will be linked to auth.users created through Supabase Auth)
-- Note: In a real scenario, users would be created through Supabase Auth
-- This is just for demonstration purposes

-- Sample user 1
INSERT INTO public.profiles (id, first_name, last_name, email, age, gender, job, whatsapp_number, avatar_url)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Alex', 'Johnson', 'alex@example.com', '28', 'male', 'Marketing Manager', '+1 (555) 123-4567', '/placeholder.svg?height=80&width=80&text=AJ');

-- Coaching preferences for user 1
INSERT INTO public.coaching_preferences (user_id, coaching_style, motivation_style, personality_type, work_schedule, hobbies)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'supportive', 'goal-tracking', 'ambivert', '9-5-weekdays', ARRAY['Reading', 'Writing', 'Technology', 'Networking']);

-- Notification preferences for user 1
INSERT INTO public.notification_preferences (user_id, notification_methods, reminder_frequency, preferred_time)
VALUES 
    ('00000000-0000-0000-0000-000000000001', ARRAY['email', 'whatsapp'], 'daily', '14:00');

-- Goals for user 1
INSERT INTO public.goals (user_id, title, description, progress, completed)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Improve Content Quality', 'Create more engaging and valuable LinkedIn posts', 30, false),
    ('00000000-0000-0000-0000-000000000001', 'Increase Posting Frequency', 'Post consistently 3 times per week', 50, false),
    ('00000000-0000-0000-0000-000000000001', 'Build Network', 'Connect with 50 new industry professionals', 20, false);

-- Check-ins for user 1
INSERT INTO public.check_ins (id, user_id, created_at)
VALUES 
    ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', now() - INTERVAL '3 days'),
    ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', now() - INTERVAL '2 days'),
    ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', now() - INTERVAL '1 day');

-- Messages for user 1's check-ins
INSERT INTO public.messages (check_in_id, content, sender)
VALUES 
    ('10000000-0000-0000-0000-000000000001', 'Hey there! How did yesterday go with your LinkedIn content creation?', 'coach'),
    ('10000000-0000-0000-0000-000000000001', 'I made progress on my goals', 'user'),
    ('10000000-0000-0000-0000-000000000001', 'That''s great to hear! What specific progress did you make?', 'coach'),
    
    ('10000000-0000-0000-0000-000000000002', 'Hey there! How did yesterday go with your LinkedIn content creation?', 'coach'),
    ('10000000-0000-0000-0000-000000000002', 'I had to deprioritize', 'user'),
    ('10000000-0000-0000-0000-000000000002', 'I understand. What were your priorities instead?', 'coach'),
    
    ('10000000-0000-0000-0000-000000000003', 'Hey there! How did yesterday go with your LinkedIn content creation?', 'coach'),
    ('10000000-0000-0000-0000-000000000003', 'I published new content', 'user'),
    ('10000000-0000-0000-0000-000000000003', 'That''s interesting! Tell me more about that.', 'coach');

-- Reminders for user 1
INSERT INTO public.reminders (user_id, title, date, time, notification_method, reminder_type)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Content Planning Session', CURRENT_DATE + INTERVAL '1 day', '09:00', 'email', 'content-creation'),
    ('00000000-0000-0000-0000-000000000001', 'Weekly Goal Review', CURRENT_DATE + INTERVAL '3 days', '14:00', 'whatsapp', 'goal-review'),
    ('00000000-0000-0000-0000-000000000001', 'Daily Check-in', CURRENT_DATE + INTERVAL '1 day', '10:00', 'email', 'check-in');

-- User stats for user 1
INSERT INTO public.user_stats (user_id, total_check_ins, current_streak, last_check_in, profile_completion)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 12, 5, now() - INTERVAL '1 day', 60);

-- Sample user 2
INSERT INTO public.profiles (id, first_name, last_name, email, age, gender, job, whatsapp_number, avatar_url)
VALUES 
    ('00000000-0000-0000-0000-000000000002', 'Sarah', 'Smith', 'sarah@example.com', '32', 'female', 'Content Creator', '+1 (555) 987-6543', '/placeholder.svg?height=80&width=80&text=SS');

-- Coaching preferences for user 2
INSERT INTO public.coaching_preferences (user_id, coaching_style, motivation_style, personality_type, work_schedule, hobbies)
VALUES 
    ('00000000-0000-0000-0000-000000000002', 'direct', 'accountability', 'extrovert', 'flexible-hours', ARRAY['Travel', 'Photography', 'Music', 'Cooking']);

-- Notification preferences for user 2
INSERT INTO public.notification_preferences (user_id, notification_methods, reminder_frequency, preferred_time)
VALUES 
    ('00000000-0000-0000-0000-000000000002', ARRAY['email', 'push'], 'weekly', '09:00');

-- Goals for user 2
INSERT INTO public.goals (user_id, title, description, progress, completed)
VALUES 
    ('00000000-0000-0000-0000-000000000002', 'Grow LinkedIn Audience', 'Reach 5000 followers by end of quarter', 40, false),
    ('00000000-0000-0000-0000-000000000002', 'Start Weekly Newsletter', 'Create and launch a weekly industry newsletter', 10, false);

-- User stats for user 2
INSERT INTO public.user_stats (user_id, total_check_ins, current_streak, last_check_in, profile_completion)
VALUES 
    ('00000000-0000-0000-0000-000000000002', 5, 0, now() - INTERVAL '5 days', 40);

-- Output counts of inserted data
SELECT 'profiles' as table_name, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 'coaching_preferences', COUNT(*) FROM public.coaching_preferences
UNION ALL
SELECT 'notification_preferences', COUNT(*) FROM public.notification_preferences
UNION ALL
SELECT 'goals', COUNT(*) FROM public.goals
UNION ALL
SELECT 'check_ins', COUNT(*) FROM public.check_ins
UNION ALL
SELECT 'messages', COUNT(*) FROM public.messages
UNION ALL
SELECT 'reminders', COUNT(*) FROM public.reminders
UNION ALL
SELECT 'user_stats', COUNT(*) FROM public.user_stats;
