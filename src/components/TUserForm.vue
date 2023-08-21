<script setup>
import { onMounted, ref, defineProps, toRefs } from "vue";
import { useUsersStore } from "../store/userStore";

const UsersStore = useUsersStore();
UsersStore.users;
let email = ref("");
let name = ref("");
async function submitForm() {
  if (type.value) {
    const user = await UsersStore.addUser({
      email: email.value,
      name: name.value,
    });
    if (user.id) {
      UsersStore.users.unshift(user);
    }
  } else
    UsersStore.users = UsersStore.editUser({
      id: UsersStore.user?.id,
      email: email.value,
      name: name.value,
    });
  UsersStore.show = false;
}
const props = defineProps({
  type: Boolean,
});

const { type } = toRefs(props);
onMounted(() => {
  email.value = UsersStore.user?.email;
  name.value = UsersStore.user?.name;
});
</script>


<template>
  <div class="opacity-100 shadow-2xl bg-indigo-900 w-1/2  h-70 p-6 rounded-lg">
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-semibold mb-2"
          >Nom</label
        >
        <input
          type="text"
          id="name"
          v-model="name"
          class="w-full border-2 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-semibold mb-2"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="email"
          class="w-full border-2 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
          required
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        <span v-if="type">Ajouter</span>
        <span v-else>Mettre à jour</span>
      </button>
    </form>
  </div>
</template>


<style>
/* Vous pouvez ajouter des styles spécifiques pour ce composant ici si nécessaire */
</style>
