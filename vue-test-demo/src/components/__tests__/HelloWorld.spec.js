import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RFCInput from '../RFCInput.vue'

const wrapper = mount(RFCInput)

describe('RFCInput Component', () => {
  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('not pass RFC XXX901010', async () => {
    const input = wrapper.find('input')
    await input.setValue('XXX901010')
    expect(wrapper.vm.isValid).toBe(false)
  })

  it('not pass 123456789', async () => {
    const input = wrapper.find('input')
    await input.setValue('123456789')
    expect(wrapper.vm.isValid).toBe(false)
  })

  it('pass RFC AAAA010101AAA', async () => {
    const input = wrapper.find('input')
    await input.setValue('AAAA010101AAA')
    expect(wrapper.vm.isValid).toBe(true)
  })

  it('pass RFC AAAA010101', async () => {
    const input = wrapper.find('input')
    await input.setValue('AAAA010101')
    expect(wrapper.vm.isValid).toBe(true)
  })
})
