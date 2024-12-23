import { supabase } from "@/lib/supabase";

export const handleCheckIn = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];

  try {
    // Start a transaction
    const { data: existingCheckIn, error: checkError } = await supabase
      .from('check_ins')
      .select()
      .eq('user_id', userId)
      .eq('check_in_date', today)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingCheckIn) {
      return { status: 'already_checked_in' };
    }

    // Create new check-in
    const { error: insertError } = await supabase
      .from('check_ins')
      .insert(
        {
          user_id: userId,
          check_in_date: today,
          commit_count: 1, // This could be fetched from GitHub API in a future enhancement
        },
      );

    if (insertError) throw insertError;

    // Update streaks
    const { data: streak, error: streakError } = await supabase
      .from('streaks')
      .select()
      .eq('user_id', userId)
      .single();

    if (streakError && streakError.code !== 'PGRST116') {
      throw streakError;
    }

    const currentStreak = streak?.current_streak || 0;
    const longestStreak = streak?.longest_streak || 0;
    const newCurrentStreak = currentStreak + 1;
    const newLongestStreak = Math.max(newCurrentStreak, longestStreak);

    const { error: updateError } = await supabase
      .from('streaks')
      .upsert({
        user_id: userId,
        current_streak: newCurrentStreak,
        longest_streak: newLongestStreak,
        last_check_in: new Date().toISOString(),
        total_check_ins: (streak?.total_check_ins || 0) + 1,
      });

    if (updateError) throw updateError;

    return {
      status: 'success',
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
    };
  } catch (error) {
    console.error('Check-in error:', error);
    throw error;
  }
};
