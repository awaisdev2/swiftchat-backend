import supabase from "../config/supabase.js";

export const createRoom = async ({ name, isPublic = true, owner_id }) => {
  const { data, error } = await supabase
    .from("rooms")
    .insert([{ name, is_public: isPublic, owner_id }])
    .select()
    .single();

  return { data, error };
};

export const getUserRooms = async (userId) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .or(`owner_id.eq.${userId},is_public.eq.true`);

  return { data, error };
};

export const getUserRoomById = async (roomId) => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", roomId)
    .single();

  return { data, error };
};
