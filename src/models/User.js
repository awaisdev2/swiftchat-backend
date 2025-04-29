import { supabase } from '../config/supabase.js'

export const createUserIfNotExists = async ({ id, email, username, image_url }) => {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', id)
    .single()

  if (data) return data

  const { data: newUser, error: insertError } = await supabase
    .from('users')
    .insert([{ id, email, username, image_url }])
    .select()
    .single()

  return newUser
}
