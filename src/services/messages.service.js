import supabase from "../config/supabase.js";

export const createMessage = async ({
  content,
  attachments,
  senderId,
  channelId,
}) => {
  const { data } = await supabase
    .from("messages")
    .insert({
      content,
      attachments,
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
      ...sender,
    },
  };

  return enrichedMessage;
};

export const updateMessage = async ({
  messageId,
  content,
  attachments,
  userId,
}) => {
  const { data } = await supabase
    .from("messages")
    .update({ content, attachments })
    .eq("id", messageId)
    .select()
    .single();

  const { data: sender, error: senderError } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", userId)
    .single();

  if (senderError) return errorResponse(res, senderError.message);

  const enrichedMessage = {
    ...data,
    users: {
      ...sender,
    },
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
  const { data: message, error: fetchError } = await supabase
    .from("messages")
    .select("created_by")
    .eq("id", messageId)
    .is("deleted_at", null)
    .single();

  if (fetchError) throw new Error("Failed to fetch message data");

  if (message.created_by !== userId) {
    throw new Error("You are not authorized to delete this message");
  }

  const { error: deleteError } = await supabase
    .from("messages")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", messageId);

  if (deleteError) throw new Error("Failed to soft delete message");

  return { success: true };
};
