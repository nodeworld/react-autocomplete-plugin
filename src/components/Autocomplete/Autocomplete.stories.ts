import type { Meta, StoryObj } from '@storybook/react';
import AutocompleteComponent from './Autocomplete';

const meta = {
    title: 'Autocomplete library',
    component: AutocompleteComponent,
    tags: ['autocomplete'],
    parameters: { layout: 'centered' },
  } satisfies Meta<typeof AutocompleteComponent>;

  export default meta;

  type Story = StoryObj<typeof meta>;

  export const Autocomplete: Story = {
    args: { dropdownData: assignDropDownData() }
  };

  function assignDropDownData() {
    const data: any = [];
    for (let i = 0; i < 5000; i++) {
      data.push(i);
    }
    return data;
  }


