<template>
  <Sidebar>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
    <NavItem>Link</NavItem>
  </Sidebar>
  <main class="md:w-3/4 mx-2 min-h-full p-4">
    <h1 class="text-3xl font-bold">Repository Name</h1>
    <div>
      <div class="flex">
        <div class="mb-3 xl:w-96">
          <Select>
            <option selected>Selected Branch</option>
            <option value="1">One Branch</option>
            <option value="2">Two Branch</option>
            <option value="3">Three Branch</option>
          </Select>
        </div>
      </div>
    </div>
    <div>
      <div class="">
        <ul class="">
          <li>
            <Commits></Commits>
          </li>
          <li>
            <Commits></Commits>
          </li>
          <li>
            <Commits></Commits>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import NavItem from "@/components/Sidebar/NavItem.vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import Select from "@/components/Form/Select.vue";
import Commit from "@/components/Commit.vue";
import Commits from "@/components/Commits.vue";

@Options({
  components: {
    NavItem,
    Sidebar,
    Select,
    Commit,
    Commits,
  },
})
export default class Repository extends Vue {}
</script>

<style></style>
