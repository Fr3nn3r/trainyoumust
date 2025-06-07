-- Grant necessary permissions to the supabase_auth_admin role
GRANT INSERT ON TABLE public.profiles TO supabase_auth_admin;
GRANT INSERT ON TABLE public.user_stats TO supabase_auth_admin;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_coaching_preferences_updated_at ON public.coaching_preferences;
CREATE TRIGGER update_coaching_preferences_updated_at
BEFORE UPDATE ON public.coaching_preferences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_notification_preferences_updated_at ON public.notification_preferences;
CREATE TRIGGER update_notification_preferences_updated_at
BEFORE UPDATE ON public.notification_preferences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_goals_updated_at ON public.goals;
CREATE TRIGGER update_goals_updated_at
BEFORE UPDATE ON public.goals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reminders_updated_at ON public.reminders;
CREATE TRIGGER update_reminders_updated_at
BEFORE UPDATE ON public.reminders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_stats_updated_at ON public.user_stats;
CREATE TRIGGER update_user_stats_updated_at
BEFORE UPDATE ON public.user_stats
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user_creation()
RETURNS TRIGGER AS $$
BEGIN
    -- Create a profile for the new user, pulling avatar from raw_user_meta_data
    INSERT INTO public.profiles (id, first_name, last_name, email, avatar_url)
    VALUES (NEW.id, '', '', NEW.email, NEW.raw_user_meta_data->>'avatar_url');
    
    -- Create default user stats
    INSERT INTO public.user_stats (user_id, profile_completion)
    VALUES (NEW.id, 0);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user_creation();

-- Function to update check-in stats
CREATE OR REPLACE FUNCTION update_check_in_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.user_stats
    SET
        total_check_ins = total_check_ins + 1,
        last_check_in = NEW.created_at,
        current_streak = 
            CASE
                -- First check-in ever, streak is 1.
                WHEN last_check_in IS NULL THEN 1
                -- If it's a new day, check if it's consecutive.
                WHEN NEW.created_at::date > last_check_in::date THEN
                    CASE
                        -- Consecutive day, increment streak.
                        WHEN (NEW.created_at::date - last_check_in::date) = 1 THEN current_streak + 1
                        -- Not consecutive, reset streak to 1.
                        ELSE 1
                    END
                -- If it's a check-in on the same day, streak doesn't change.
                ELSE current_streak
            END
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for check-in stats
DROP TRIGGER IF EXISTS on_check_in_created ON public.check_ins;
CREATE TRIGGER on_check_in_created
AFTER INSERT ON public.check_ins
FOR EACH ROW EXECUTE FUNCTION update_check_in_stats();

-- Output the created triggers
SELECT trigger_name, event_manipulation, action_statement 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';
