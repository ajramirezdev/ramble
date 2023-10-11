class RoomModel {
  constructor() {}

  async createRoom(roomData) {
    try {
      const response = await fetch("http://localhost:2222/room", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Failed to create room", error);
    }
  }

  async getAllRooms() {
    try {
      const response = await fetch("http://localhost:2222/room");
      const rooms = await response.json();
      return rooms;
    } catch (error) {
      throw new Error("Failed to get all rooms", error);
    }
  }

  async getPublicRooms() {
    try {
      const response = await fetch("http://localhost:2222/room");
      const rooms = await response.json();
      const publicRooms = await rooms.filter((room) => !room.isPrivate);
      return publicRooms;
    } catch (error) {
      throw new Error("Failed to get all rooms", error);
    }
  }

  async getPrivateRooms() {
    try {
      const response = await fetch("http://localhost:2222/room");
      const rooms = await response.json();
      const publicRooms = await rooms.filter((room) => room.isPrivate);
      return publicRooms;
    } catch (error) {
      throw new Error("Failed to get all rooms", error);
    }
  }

  async getOneRoom(roomId) {
    try {
      const response = await fetch(`http://localhost:2222/room/${roomId}`);
      const room = await response.json();
      return room;
    } catch (error) {
      throw new Error("Failed to get room data", error);
    }
  }

  async getRoomByName(roomName) {
    try {
      const response = await fetch(
        `http://localhost:2222/room?name=${roomName}`
      );
      const room = await response.json();
      return room;
    } catch (error) {
      throw new Error("Failed to get room data", error);
    }
  }

  async getCreatedRooms(userId) {
    try {
      const response = await fetch(
        `http://localhost:2222/room?createdBy=${userId}`
      );
      const rooms = await response.json();
      return rooms;
    } catch (error) {
      throw new Error("Failed to get created rooms", error);
    }
  }

  async getJoinedRooms(userId) {
    try {
      const response = await fetch(
        `http://localhost:2222/room?joinedBy=${userId}`
      );
      const rooms = await response.json();
      return rooms;
    } catch (error) {
      throw new Error("Failed to get joined rooms", error);
    }
  }

  async editRoom(roomId, edits) {
    try {
      const response = await fetch(`http://localhost:2222/room/${roomId}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(edits),
      });
      const editedRoom = response.json();
      return editedRoom;
    } catch (error) {
      throw new Error("Failed to edit room", error);
    }
  }

  async deleteRoom(roomId) {
    try {
      await fetch(`http://localhost:2222/room/${roomId}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error("Failed to delte room", error);
    }
  }
}

const model = new RoomModel();

export default model;
