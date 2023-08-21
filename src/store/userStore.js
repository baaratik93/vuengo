
import axios from "axios";
import { defineStore } from "pinia";

export let useUsersStore = defineStore("users", {
  state() {
    return {
      users: [],
      user: {
        id: 0,
        name: "",
        email: "",
      },
      show: false,
      type: false,
    };
  },
  actions: {
    async allUsers() {
      try {
        this.users = await this.getUsers;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(user) {
      if (confirm("Etes-vous sûr de vouloir supprimer")) {
        const users = await axios.delete("/users/" + user.id + "/delete");
        // this.users = users.data;
        return users.status;
      } else {
        this.users = this.allUsers();
      }
    },
    async editUser(user) {
      if (confirm("Etes-vous sûr de vouloir modifier")) {
        const users = await axios.put("/users/" + user.id + "/edit", user);
        this.users = users.data;
      } else {
        this.users = this.allUsers();
      }
    },
    async addUser(user) {
      if (confirm("Voulez-vous enrégister?")) {
        const users = await axios.post("/users/new", user);
        const newUser = await users.data.users.find(
          (u) => u.email === user.email
        );
        return newUser;
      } else {
        this.users = this.allUsers();
      }
    },
    deleteOne(id) {
      try {
        this.users.splice(0, id);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    async getUsers() {
      try {
        return await (
          await axios.get("/users")
        ).data.users;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
