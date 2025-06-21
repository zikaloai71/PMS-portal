const ROOTS = {
    HOME: '/',
};

export const paths = {
    // Home
    home: {
        root: `${ROOTS.HOME}properties`,
        properties: {
            root: `${ROOTS.HOME}properties`,
        },
        bookings: {
            root: (email: string) => `${ROOTS.HOME}bookings/${email}`,
        },
    },
};
