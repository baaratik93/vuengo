<script setup>
import { useUsersStore } from "@/store/userStore";
const usersStore = useUsersStore();
function EditForm(user) {
  usersStore.user = user;
  usersStore.show = true;
  usersStore.type = false;
}

async function DeleteUser(user) {
  const status = await usersStore.deleteUser(user)
  if(status)
  usersStore.users.splice(
    usersStore.users.findIndex((u) => u.id === user.id),
    1
  );
}
</script>
<template>
  <div class="">
    <table class="mx-auto w-auto p-2 rounded-xl overflow-hidden">
      <thead>
        <tr class="bg-indigo-500 text-white flex place-content-between">
          <th class="py-2 px-[9.2%]">ID</th>
          <th class="py-2 px-[11%]">NOM</th>
          <th class="py-2 px-[11%]">EMAIL</th>
          <th class="py-2 px-[3.7%]">EDIT</th>
          <th class="py-2 px-5">DELETE</th>
        </tr>
      </thead>
      <TransitionGroup name="list" tag="div">
        <tr
          v-for="(user, k) in usersStore.users"
          :key="user.id"
          :class="k % 2 != 0 ? 'bg-indigo-400' : 'bg-indigo-300'"
          class="hover:scale-[1.01] hover:bg-white hover:font-bold"
        >
          <td class="px-10 py-2 border-r-2 border-blue-500">{{ user.id }}</td>
          <td class="px-10 py-2">{{ user.name }}</td>
          <td class="px-10 py-2">{{ user.email }}</td>
          <td class="px-10 py-2 border-l-2 border-blue-500">
            <button @click.prevent="EditForm(user)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="fill: orange; transform: ; msfilter: "
              >
                <path
                  d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"
                ></path>
                <path
                  d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"
                ></path>
              </svg>
            </button>
          </td>
          <td class="px-10 py-2 border-l-2 border-blue-500">
            <button @click.prevent="DeleteUser(user)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                style="fill: rgba(245, 6, 6, 1); transform: ; msfilter: "
              >
                <path
                  d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"
                ></path>
              </svg>
            </button>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>