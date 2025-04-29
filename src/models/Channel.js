import { supabase } from '../config/supabase.js'

export const createChannel = async ({ name, room_id }) => {
  const { data, error } = await supabase
    .from('channels')
    .insert([{ name, room_id }])
    .select()
    .single()

  return { data, error }
}

export const getChannelsByRoom = async (roomId) => {
  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .eq('room_id', roomId)

  return { data, error }
}
