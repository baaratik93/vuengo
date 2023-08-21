<script setup>
import { useUsersStore } from "./store/userStore";
import TUserForm from "./components/TUserForm.vue";
import TTable from "./components/TTable.vue";
import { onMounted, ref } from "vue";
let recherche = ref("");
const usersStore = useUsersStore();

function OpenForm() {
  if (usersStore.user) {
    usersStore.user.email = "";
    usersStore.user.name = "";
  }
  usersStore.show = true;
  usersStore.type = true;
}



async function SearchHandler() {
  const users = await usersStore.getUsers;
  if (recherche.value.length > 0)
    usersStore.users = users.filter(
      (user) =>
        user.id.includes(recherche.value) ||
        user.email.includes(recherche.value) ||
        user.name.includes(recherche.value)
    );
  else usersStore.allUsers();
}

onMounted(() => {
  usersStore.allUsers();
});
</script>
<template>
  <div
    class="grid absolute left-0 top-0 right-0 bottom-0 place-content-center bg-blue-200"
  >
    <div
      v-if="usersStore.show"
      class="fixed w-full h-full bg-black p-8 border-2 border-gray-300 rounded-lg opacity-80 flex place-items-center place-content-center"
    >
      <t-user-form :type="usersStore.type" />
      <button
        @click.prevent="usersStore.show = false"
        class="fixed top-12 right-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: rgba(236, 14, 18, 1); transform: ; msfilter: "
        >
          <path
            d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm0 11H8v-2h8v2z"
          ></path>
        </svg>
      </button>
    </div>
    <div
      class="flex justify-between px-3 py-6 border-t-2 rounded-t-2xl border-gray-500"
    >
      <div
        class="flex bg-gray-600 justify-between items-center rounded-xl overflow-hidden"
      >
        <input
          type="text"
          v-model="recherche"
          placeholder="Rechercher"
          @input="SearchHandler"
          class="h-8 max-w-4xl text-center px-2 mr-2 border-r-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="cursor-pointer"
          style="fill: white; transform: ; msfilter: "
        >
          <path
            d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
          ></path>
        </svg>
      </div>
      <button @click.prevent="OpenForm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="fill: rgba(10, 241, 119, 1); transform: ; msfilter: "
        >
          <path d="M15 2.013H9V9H2v6h7v6.987h6V15h7V9h-7z"></path>
        </svg>
      </button>
    </div>
    <t-table/>
  </div>
</template>
