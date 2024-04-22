export default {
    darkMode: 'media',
    content: [
        `components/**/*.{vue,js,ts}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `composables/**/*.{js,ts}`,
        `plugins/**/*.{js,ts}`,
        `app.{js,ts,vue}`,
    ],
    theme: {
        colors: {
            'gray': '#e2e2e2',
            'black': '#000000',
            'white': '#ffffff',
            'primary': {
                '400': '#f54363',
                '500': '#d81f41'
            },
            'dark-gray': '#131313'
        }
    }
}
  