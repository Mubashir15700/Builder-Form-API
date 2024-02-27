const setCookie = (res, cookieName, token, options = {}) => {
    const defaultOptions = {
        maxAge: 60000 * 60 * 24 * 7,
        httpOnly: true,
        secure: true, // Ensures cookie is only sent over HTTPS
    };

    const mergedOptions = { ...defaultOptions, ...options };

    res.cookie(cookieName, token, mergedOptions);
};

module.exports = setCookie;
