import supabase from "../config/supabase.js";

export const createMessage = async ({ content, senderId, channelId }) => {
  const { data } = await supabase
    .from("messages")
    .insert({
      content,
      created_by: senderId,
      channel_id: channelId,
    })
    .select()
    .single();

  const { data: sender, error: senderError } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", senderId)
    .single();

  if (senderError) return errorResponse(res, senderError.message);

  const enrichedMessage = {
    ...data,
    users: {
      ...sender
    }
  };

  return enrichedMessage;
};

export const getMessagesByChannel = async ({ channelId }) => {
  return supabase
    .from("messages")
    .select("*, users!inner(*)")
    .eq("channel_id", channelId)
    .order("created_at", { ascending: true });
};

export const deleteMessage = async ({ messageId, userId }) => {
  // Check if the message exists and belongs to the user
  const { data: message, error: fetchError } = await supabase
    .from("messages")
    .select("user_id")
    .eq("id", messageId)
    .single();

  if (fetchError) {
    throw new Error("Failed to fetch message data");
  }

  // If the message doesn't belong to the user, return an error
  if (message.user_id !== userId) {
    throw new Error("You are not authorized to delete this message");
  }

  // Proceed to delete the message
  const { error: deleteError } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId);

  if (deleteError) {
    throw new Error("Failed to delete message");
  }

  return { success: true };
};
