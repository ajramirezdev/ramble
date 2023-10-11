class UserModel {
  constructor() {}

  async registerUser(user) {
    try {
      const response = await fetch("http://localhost:2222/user", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async login(email, password) {
    try {
      const user = {
        email: email,
        password: password,
      };
      const response = await fetch("http://localhost:2222/user/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized Access");
      } else if (response.status === 404) {
        throw new Error("User not found");
      }

      const data = await response.text();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAllUsers() {
    try {
      const response = await fetch("http://localhost:2222/user");
      const users = await response.json();
      return users;
    } catch (error) {
      throw new Error("Failed to get all rooms", error);
    }
  }

  async getOneUser(userId) {
    try {
      const response = await fetch(`http://localhost:2222/user/${userId}`);
      const user = await response.json();
      return user;
    } catch (error) {
      throw new Error("Failed to get user data", error);
    }
  }

  async getUserByEmail(email) {
    try {
      const response = await fetch(`http://localhost:2222/user?email=${email}`);
      const user = await response.json();
      return user;
    } catch (error) {
      throw new Error("Failed to get user data", error);
    }
  }

  async editeUser(userId, edits) {
    try {
      await fetch(`http://localhost:2222/user/${userId}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(edits),
      });
    } catch (error) {
      throw new Error("Failed to edit user", error);
    }
  }

  async deleteUser(userId) {
    try {
      await fetch(`http://localhost:2222/user/${userId}`, {
        method: "DELETE",
      });
    } catch (error) {
      throw new Error("Failed to delte user", error);
    }
  }
}

const model = new UserModel();

export default model;
