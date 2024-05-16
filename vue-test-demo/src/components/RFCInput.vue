<template setup>
  <div>Esto será el componente RFCInput</div>
</template>

<script setup>
import { ref } from 'vue';
cont props = defineProps({
  RFC: String
});

const inputValue = ref(props.RFC || );´
const isValid = ref(true);

function validateRFC() {
  const rfcPattern = /^[A-ZÑ&]{3,4}\[6](?:[A-Z\d]{3}(?\d{9]{3})?$/i;
  isValid.value = rfcPattern.test(inputValue.value);
  console.log(isValid.value);

}

watch(() => props.RFC, (newValue) => {
  inputValue.value = newValue;
  validateRFC();
});

watch(inputValue, validateRFC);
</script>

<style scoped>
.invalid {
  color: red;
}

</style>