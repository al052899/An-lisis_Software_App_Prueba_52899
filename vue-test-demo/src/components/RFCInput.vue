<template>
  <div>
    <input v-model="inputValue" @input="validateRFC" placeholder="Enter RFC" />
    <p class="invalid" v-if="!isValid">RFC no válido</p>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'

const props = defineProps({
  RFC: String
})

const inputValue = ref(props.RFC || '')
const isValid = ref(null)

function rfcValido(rfc, aceptarGenerico = true) {
  const re =
    /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/
  const validado = rfc.match(re)

  if (!validado) return false

  const digitoVerificador = validado.pop()
  const rfcSinDigito = validado.slice(1).join('')
  const len = rfcSinDigito.length
  const diccionario = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ'
  const indice = len + 1
  let suma
  let digitoEsperado

  if (len == 12) suma = 0
  else suma = 481

  for (let i = 0; i < len; i++) {
    suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i)
  }
  digitoEsperado = 11 - (suma % 11)
  if (digitoEsperado == 11) digitoEsperado = 0
  else if (digitoEsperado == 10) digitoEsperado = 'A'

  if (
    digitoVerificador != digitoEsperado &&
    (!aceptarGenerico || rfcSinDigito + digitoVerificador != 'XAXX010101000')
  ) {
    return false
  } else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == 'XEXX010101000') {
    return false
  }

  return rfcSinDigito + digitoVerificador
}

function validateRFC() {
  const rfc = inputValue.value.trim().toUpperCase()
  isValid.value = rfcValido(rfc, false) !== false
  console.log(isValid.value)
}

watch(
  () => props.RFC,
  (newValue) => {
    inputValue.value = newValue
    validateRFC()
  }
)

watch(inputValue, validateRFC)
</script>

<style scoped>
.invalid {
  color: red;
}
</style>
