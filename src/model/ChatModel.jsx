class ChatModel {
  constructor() {
    this.BASE_URL = "https://ramble-be.onrender.com";
  }

  async addMessage(roomId, sender, message) {
    try {
      const chat = {
        roomId: roomId,
        sender: sender,
        body: message,
      };
      await fetch(`${this.BASE_URL}/chat`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chat),
      });
    } catch (err) {
      throw new Error("Failed to add message", err);
    }
  }

  async getRoomMessages(roomId) {
    try {
      const response = await fetch(`${this.BASE_URL}/chat/${roomId}`);
      const roomMessages = await response.json();
      return roomMessages;
    } catch (err) {
      console.error(err);
    }
  }

  async getPrivateMessages(senderId, receiverId) {
    try {
      const response = await fetch(
        `${this.BASE_URL}/chat/${senderId}/${receiverId}`
      );
      const privateMessages = await response.json();
      return privateMessages;
    } catch (err) {
      console.error(err);
    }
  }
}

const model = new ChatModel();

export default model;
