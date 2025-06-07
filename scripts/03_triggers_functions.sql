-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coaching_preferences_updated_at
BEFORE UPDATE ON public.coaching_preferences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at
BEFORE UPDATE ON public.notification_preferences
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goals_updated_at
BEFORE UPDATE ON public.goals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reminders_updated_at
BEFORE UPDATE ON public.reminders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at
BEFORE UPDATE ON public.user_stats
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user_creation()
RETURNS TRIGGER AS $$
BEGIN
    -- Create a profile for the new user
    INSERT INTO public.profiles (id, first_name, last_name, email)
    VALUES (NEW.id, '', '', NEW.email);
    
    -- Create default user stats
    INSERT INTO public.user_stats (user_id, profile_completion)
    VALUES (NEW.id, 0);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user_creation();

-- Function to update check-in stats
CREATE OR REPLACE FUNCTION update_check_in_stats()
RETURNS TRIGGER AS $$
DECLARE
    last_check_in_time TIMESTAMP WITH TIME ZONE;
    streak_days INTEGER;
BEGIN
    -- Get the user's last check-in time
    SELECT last_check_in INTO last_check_in_time
    FROM public.user_stats
    WHERE user_id = NEW.user_id;
    
    -- Update total check-ins
    UPDATE public.user_stats
    SET total_check_ins = total_check_ins + 1,
        last_check_in = NEW.created_at
    WHERE user_id = NEW.user_id;
    
    -- Update streak if applicable
    IF last_check_in_time IS NULL OR 
       (NEW.created_at::date - last_check_in_time::date) <= INTERVAL '1 day' THEN
        -- Continue or start streak
        UPDATE public.user_stats
        SET current_streak = current_streak + 1
        WHERE user_id = NEW.user_id;
    ELSE
        -- Reset streak
        UPDATE public.user_stats
        SET current_streak = 1
        WHERE user_id = NEW.user_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for check-in stats
CREATE TRIGGER on_check_in_created
AFTER INSERT ON public.check_ins
FOR EACH ROW EXECUTE FUNCTION update_check_in_stats();

-- Output the created triggers
SELECT trigger_name, event_manipulation, action_statement 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';
