import User from '../models/User.js';

// Login or register user
export async function loginUser(req, res) {
    try {
        const { uid, email, displayName, photoURL } = req.user;

        // Check if user exists in database
        let user = await User.findOne({ uid });

        if (!user) {
            // Create new user if they don't exist
            user = new User({ uid, email, displayName, photoURL });
            await user.save();
        } else {
            // Update existing user info
            user.email = email;
            user.displayName = displayName;
            user.photoURL = photoURL;
            await user.save();
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            },
        });
    } catch (error) {
        console.error('Error in loginUser controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get current user
export async function getCurrentUser(req, res) {
    try {
        const { uid } = req.user;

        const user = await User.findOne({ uid });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            },
        });
    } catch (error) {
        console.error('Error in getCurrentUser controller:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
