import { supabase } from '../config/supabase.js'

export const sendMessage = async ({ content, sender_id, channel_id }) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ content, sender_id, channel_id }])
    .select()
    .single()

  return { data, error }
}

export const getMessagesByChannel = async (channelId) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*, users(*)')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true })

  return { data, error }
}
