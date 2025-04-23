-- Add insert policy for users table
DO $$
BEGIN
    -- Check if the policy for users insert exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'Users can insert own data'
    ) THEN
        -- Create policy to allow users to insert their own data
        EXECUTE 'CREATE POLICY "Users can insert own data" ON public.users
                FOR INSERT WITH CHECK (auth.uid()::text = user_id)';
    END IF;

    -- Check if the policy for users update exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'Users can update own data'
    ) THEN
        -- Create policy to allow users to update their own data
        EXECUTE 'CREATE POLICY "Users can update own data" ON public.users
                FOR UPDATE USING (auth.uid()::text = user_id)';
    END IF;

    -- Add a policy for service role to manage all users
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'users' 
        AND policyname = 'Service role can manage all users'
    ) THEN
        -- Create policy for service role
        EXECUTE 'CREATE POLICY "Service role can manage all users" ON public.users
                USING (auth.role() = ''service_role'')';
    END IF;
END
$$;