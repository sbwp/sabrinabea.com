window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        jtd.setTheme('dark');
    } else {
        jtd.setTheme('light');
    }
});

// Set the initial theme based on the user's preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    jtd.setTheme('dark');
} else {
    jtd.setTheme('light');
}
