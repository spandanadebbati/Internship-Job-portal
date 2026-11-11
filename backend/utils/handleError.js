// Sends a clear error response for common Mongoose errors.
// - ValidationError: a required field is missing or a value is invalid -> 400
// - CastError: the id in the URL is not a valid MongoDB id -> 400
// - anything else: unexpected server problem -> 500
function handleError(res, error) {
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ message: messages.join(', ') });
    }

    if (error.name === 'CastError') {
        return res.status(400).json({ message: `Invalid ${error.path}: ${error.value}` });
    }

    console.error('Server error:', error);
    return res.status(500).json({ message: 'Something went wrong on the server' });
}

module.exports = handleError;
