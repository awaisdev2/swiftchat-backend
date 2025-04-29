import supabase from "../config/supabase.js";

export const createChannel = async ({ name, createdBy, memberIds = [] }) => {
  const { data: channel, error } = await supabase
    .from("channels")
    .insert({
      name,
      room_id: "a0855cea-83d2-410f-9c17-137b8ffd43a2",
      created_by: createdBy,
    })
    .select()
    .single();

  if (error) return { data: null, error };

  // Add the creator + other members to channel_members
  const membersToAdd = [createdBy, ...memberIds].map((userId) => ({
    channel_id: channel.id,
    user_id: userId,
  }));

  const { error: memberError } = await supabase
    .from("channel_members")
    .insert(membersToAdd);

  if (memberError) return { data: null, error: memberError };

  return { data: channel, error: null };
};

export const getChannels = async ({ userId }) => {
  const { data, error } = await supabase
    .from("channel_members")
    .select("channels(*)")
    .eq("user_id", userId);

  if (error) return { data: null, error };

  const flattened = data.map((item) => item.channels);
  return { data: flattened };
};

export const getChannelById = async ({ channelId }) => {
  return supabase.from("channels").select("*").eq("id", channelId);
};

export const deleteChannel = async ({ channelId }) => {
  return supabase.from("channels").delete().eq("id", channelId);
};

export const createInvitations = async ({
  channelId,
  invitedBy,
  memberIds,
}) => {
  const invitations = memberIds.map((userId) => ({
    channel_id: channelId,
    invited_by: invitedBy,
    user_id: userId,
    status: "pending",
  }));

  const { data, error } = await supabase
    .from("channel_invitations")
    .insert(invitations)
    .select();

  return { data, error };
};

export const respondToInvitation = async ({ invitationId, userId, status }) => {
  const { data, error } = await supabase
    .from("channel_invitations")
    .update({ status })
    .eq("id", invitationId)
    .eq("user_id", userId)
    .select()
    .single();

  return { data, error };
};

export const getPendingInvitations = async ({ userId }) => {
  return supabase
    .from("channel_invitations")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "pending");
};
