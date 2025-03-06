/** @type { import('@storybook/react').Preview } */
import React from "react";
import '../src/assets/sass/main.scss'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered", 
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "24px"}}>
        <Story />
      </div>
    )
  ],
};

export default preview;
