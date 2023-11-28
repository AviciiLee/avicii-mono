import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('render button with type success', () => {
    const wrapper = shallowMount(Button, {
      props: { type: 'primary' },
    });
    expect(wrapper.classes()).toContain('primary');
  });
});
