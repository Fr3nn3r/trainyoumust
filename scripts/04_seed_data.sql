-- INSTRUCTIONS:
-- This script now updates existing user profiles and stats created by the auth trigger.
-- It also cleans up and re-inserts other related data, so it's safe to run multiple times.
-- 1. Ensure you have created the two users in Supabase Auth.
-- 2. Ensure the UUIDs below match the users you created.
-- 3. Run this entire script in the Supabase SQL Editor.

-- Clean up existing data for the users to ensure the script is re-runnable
-- Note: We don't delete from 'profiles' or 'user_stats' because the auth trigger creates them.
-- We will update them instead.
DELETE FROM public.messages WHERE check_in_id IN (SELECT id FROM public.check_ins WHERE user_id IN ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', '939a88a5-9965-4bb9-828a-93c8da9fae4d'));
DELETE FROM public.check_ins WHERE user_id IN ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', '939a88a5-9965-4bb9-828a-93c8da9fae4d');
DELETE FROM public.reminders WHERE user_id IN ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', '939a88a5-9965-4bb9-828a-93c8da9fae4d');
DELETE FROM public.goals WHERE user_id IN ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', '939a88a5-9965-4bb9-828a-93c8da9fae4d');
DELETE FROM public.notification_preferences WHERE user_id IN ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', '939a88a5-9965-4bb9-828a-93c8da9fae4d');
DELETE FROM public.coaching_preferences WHERE user_id IN ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', '939a88a5-9965-4bb9-828a-93c8da9fae4d');

-- Update user profile (created by trigger) for user 1
UPDATE public.profiles
SET 
    first_name = 'Alex', 
    last_name = 'Johnson', 
    email = 'alex@example.com', 
    age = '28', 
    gender = 'male', 
    job = 'Marketing Manager', 
    whatsapp_number = '+1 (555) 123-4567', 
    avatar_url = '/placeholder.svg?height=80&width=80&text=AJ'
WHERE id = 'eb63200d-47d0-4fcb-b0a3-77859dd4af62';

-- Coaching preferences for user 1
INSERT INTO public.coaching_preferences (user_id, coaching_style, motivation_style, personality_type, work_schedule, hobbies)
VALUES 
    ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', 'supportive', 'goal-tracking', 'ambivert', '9-5-weekdays', ARRAY['Reading', 'Writing', 'Technology', 'Networking']);

-- Notification preferences for user 1
INSERT INTO public.notification_preferences (user_id, notification_methods, reminder_frequency, preferred_time)
VALUES 
    ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', ARRAY['email', 'whatsapp'], 'daily', '14:00');

-- Goals for user 1
INSERT INTO public.goals (user_id, title, description, progress, completed)
VALUES 
    ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', 'Improve Content Quality', 'Create more engaging and valuable LinkedIn posts', 30, false),
    ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', 'Increase Posting Frequency', 'Post consistently 3 times per week', 50, false),
    ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', 'Build Network', 'Connect with 50 new industry professionals', 20, false);

-- Check-ins for user 1
INSERT INTO public.check_ins (id, user_id, created_at)
VALUES 
    ('10000000-0000-0000-0000-000000000001', 'eb63200d-47d0-4fcb-b0a3-77859dd4af62', now() - INTERVAL '3 days'),
    ('10000000-0000-0000-0000-000000000002', 'eb63200d-47d0-4fcb-b0a3-77859dd4af62', now() - INTERVAL '2 days'),
    ('10000000-0000-0000-0000-000000000003', 'eb63200d-47d0-4fcb-b0a3-77859dd4af62', now() - INTERVAL '1 day');

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
    ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', 'Content Planning Session', CURRENT_DATE + INTERVAL '1 day', '09:00', 'email', 'content-creation'),
    ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', 'Weekly Goal Review', CURRENT_DATE + INTERVAL '3 days', '14:00', 'whatsapp', 'goal-review'),
    ('eb63200d-47d0-4fcb-b0a3-77859dd4af62', 'Daily Check-in', CURRENT_DATE + INTERVAL '1 day', '10:00', 'email', 'check-in');

-- Update user stats (created by trigger) for user 1
UPDATE public.user_stats
SET
    total_check_ins = 12, 
    current_streak = 5, 
    last_check_in = now() - INTERVAL '1 day', 
    profile_completion = 60
WHERE user_id = 'eb63200d-47d0-4fcb-b0a3-77859dd4af62';

-- Update user profile (created by trigger) for user 2
UPDATE public.profiles
SET 
    first_name = 'Sarah', 
    last_name = 'Smith', 
    email = 'sarah@example.com', 
    age = '32', 
    gender = 'female', 
    job = 'Content Creator', 
    whatsapp_number = '+1 (555) 987-6543', 
    avatar_url = '/placeholder.svg?height=80&width=80&text=SS'
WHERE id = '939a88a5-9965-4bb9-828a-93c8da9fae4d';

-- Coaching preferences for user 2
INSERT INTO public.coaching_preferences (user_id, coaching_style, motivation_style, personality_type, work_schedule, hobbies)
VALUES 
    ('939a88a5-9965-4bb9-828a-93c8da9fae4d', 'direct', 'accountability', 'extrovert', 'flexible-hours', ARRAY['Travel', 'Photography', 'Music', 'Cooking']);

-- Notification preferences for user 2
INSERT INTO public.notification_preferences (user_id, notification_methods, reminder_frequency, preferred_time)
VALUES 
    ('939a88a5-9965-4bb9-828a-93c8da9fae4d', ARRAY['email', 'push'], 'weekly', '09:00');

-- Goals for user 2
INSERT INTO public.goals (user_id, title, description, progress, completed)
VALUES 
    ('939a88a5-9965-4bb9-828a-93c8da9fae4d', 'Grow LinkedIn Audience', 'Reach 5000 followers by end of quarter', 40, false),
    ('939a88a5-9965-4bb9-828a-93c8da9fae4d', 'Start Weekly Newsletter', 'Create and launch a weekly industry newsletter', 10, false);

-- Update user stats (created by trigger) for user 2
UPDATE public.user_stats
SET 
    total_check_ins = 5, 
    current_streak = 0, 
    last_check_in = now() - INTERVAL '5 days', 
    profile_completion = 40
WHERE user_id = '939a88a5-9965-4bb9-828a-93c8da9fae4d';

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
