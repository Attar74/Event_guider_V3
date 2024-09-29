<template>
  <v-snackbar
    v-bind="{ ...$attrs }"
    v-model="snackbar.show"
    :color="snackbar?.color"
    :location="snackbar?.location"
    :multi-line="snackbar?.multiLine"
    :timeout="snackbar?.timeout"
    :variant="snackbar?.variant"
  >
    <span class="text-capitalize">{{ snackbar?.text }}</span>

    <template #actions>
      <v-btn color="white" variant="text" @click="closeSnackbar">
        {{ $t('cancel') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
const snackbarStore = useSnackbarStore();
const { snackbar } = storeToRefs(snackbarStore);

const closeSnackbar = () => {
  snackbarStore.fireSnack({
    show: false,
  });
};
</script>
