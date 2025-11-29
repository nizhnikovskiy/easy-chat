/** @type {import('@ladle/react').UserConfig} */
export default {
  viteConfig: {
    // Ensure Tailwind styles are loaded globally
    css: {
      postcss: './postcss.config.js',
    },
  },
  // Import global styles with Tailwind directives
  addons: {
    a11y: {
      enabled: false,
    },
  },
  // You can also define global styles here
  defaultStory: 'chat--chat-story',
};
