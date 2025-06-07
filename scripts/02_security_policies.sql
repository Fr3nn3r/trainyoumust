-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create policies for coaching_preferences
CREATE POLICY "Users can view their own coaching preferences" 
ON public.coaching_preferences FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own coaching preferences" 
ON public.coaching_preferences FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own coaching preferences" 
ON public.coaching_preferences FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for notification_preferences
CREATE POLICY "Users can view their own notification preferences" 
ON public.notification_preferences FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notification preferences" 
ON public.notification_preferences FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification preferences" 
ON public.notification_preferences FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for goals
CREATE POLICY "Users can view their own goals" 
ON public.goals FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals" 
ON public.goals FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" 
ON public.goals FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals" 
ON public.goals FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for check_ins
CREATE POLICY "Users can view their own check-ins" 
ON public.check_ins FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own check-ins" 
ON public.check_ins FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for messages
CREATE POLICY "Users can view messages from their own check-ins" 
ON public.messages FOR SELECT 
USING (EXISTS (
    SELECT 1 FROM public.check_ins 
    WHERE check_ins.id = messages.check_in_id 
    AND check_ins.user_id = auth.uid()
));

CREATE POLICY "Users can insert messages to their own check-ins" 
ON public.messages FOR INSERT 
WITH CHECK (EXISTS (
    SELECT 1 FROM public.check_ins 
    WHERE check_ins.id = messages.check_in_id 
    AND check_ins.user_id = auth.uid()
));

-- Create policies for reminders
CREATE POLICY "Users can view their own reminders" 
ON public.reminders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders" 
ON public.reminders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders" 
ON public.reminders FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reminders" 
ON public.reminders FOR DELETE 
USING (auth.uid() = user_id);

-- Create policies for user_stats
CREATE POLICY "Users can view their own stats" 
ON public.user_stats FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" 
ON public.user_stats FOR UPDATE 
USING (auth.uid() = user_id);

-- Output the created policies
SELECT table_name, policy_name FROM pg_policies WHERE schemaname = 'public';
